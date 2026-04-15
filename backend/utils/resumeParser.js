const fs = require("fs");
const pdfjsLib = require("pdfjs-dist");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const extractTextFromPDF = async (buffer) => {
    const loadingTask = pdfjsLib.getDocument({ data: new Uint8Array(buffer) });
    const pdfDoc = await loadingTask.promise;

    let fullText = "";
    for (let i = 1; i <= pdfDoc.numPages; i++) {
        const page = await pdfDoc.getPage(i);
        const content = await page.getTextContent();
        fullText += content.items.map(item => item.str).join(" ") + "\n";
    }

    if (fullText.trim().length < 50) {
        throw new Error("No readable text found in PDF");
    }

    return fullText.replace(/\s+/g, " ").replace(/\n+/g, "\n").trim();
};

const mapToUserSchema = (data) => {
  const result = {};

  // Basic fields
  if (data.name?.trim()) result.name = data.name;
  if (data.email?.trim()) result.email = data.email;
  if (data.location?.trim()) result.location = data.location;
  if (data.headline?.trim()) result.headline = data.headline;
  if (data.bio?.trim()) result.bio = data.bio;

  // Skills
  if (Array.isArray(data.skills) && data.skills.length > 0) {
    const validSkills = data.skills
      .filter(s => s.name?.trim())
      .map(skill => ({
        name: skill.name,
        level: skill.level || "beginner",
      }));

    if (validSkills.length > 0) result.skills = validSkills;
  }

  // Education
  if (Array.isArray(data.education) && data.education.length > 0) {
    const validEducation = data.education.filter(
      edu => edu.degree?.trim() || edu.institute?.trim()
    );

    if (validEducation.length > 0) result.education = validEducation;
  }

  // Experience
  if (Array.isArray(data.experience) && data.experience.length > 0) {
    const validExperience = data.experience.filter(
      exp => exp.role?.trim() || exp.company?.trim()
    );

    if (validExperience.length > 0) result.experience = validExperience;
  }

  // Projects
  if (Array.isArray(data.projects) && data.projects.length > 0) {
    const validProjects = data.projects.filter(
      proj => proj.title?.trim()
    );

    if (validProjects.length > 0) result.projects = validProjects;
  }

  // Job Preferences
  if (data.jobPreferences) {
    const jp = {};

    if (Array.isArray(data.jobPreferences.locations) && data.jobPreferences.locations.length > 0) {
      jp.locations = data.jobPreferences.locations.filter(l => l.trim());
    }

    if (Array.isArray(data.jobPreferences.roles) && data.jobPreferences.roles.length > 0) {
      jp.roles = data.jobPreferences.roles.filter(r => r.trim());
    }

    if (Object.keys(jp).length > 0) result.jobPreferences = jp;
  }

  return result;
};

const parseResumeWithGemini = async (resumeText) => {
    const prompt = `
You are a resume parser.

Extract structured data from the resume text and return ONLY valid JSON.

Follow this schema strictly:

{
  "name": "",
  "email": "",
  "location": "",
  "headline": "",
  "skills": [{ "name": "", "level": "beginner|intermediate|advanced" }],
  "education": [{ "degree": "", "institute": "", "year": "", "grade": "" }],
  "experience": [{
    "role": "",
    "company": "",
    "duration": "",
    "description": ""
  }],
  "projects": [{
    "title": "",
    "description": "",
    "techStack": []
  }],
  "jobPreferences": {
    "locations": [],
    "roles": []
  },
  "bio": ""
}

Rules:
- Return ONLY JSON (no explanation)
- If data is missing, return empty string or empty array
- Infer skill level based on context
- Clean duplicates

Resume Text:
${resumeText}
`;
    try {
        const model = genAI.getGenerativeModel({ model: "models/gemini-2.5-flash-lite" });

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text().replace(/^```json\s*|^```\s*|```\s*$/gm, "").trim();
        return JSON.parse(text);
    } catch (err) {
        console.error("Error parsing resume with Gemini:", err);
        throw new Error("Failed to parse resume");
    }
};

module.exports = { extractTextFromPDF, parseResumeWithGemini ,mapToUserSchema};
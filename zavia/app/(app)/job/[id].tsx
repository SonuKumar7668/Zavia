import { useEffect, useState } from "react";
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
  ActivityIndicator, Alert, Share,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "../../../src/context/AuthContext";
import { getJobById, applyForJob, saveJob } from "../../../src/api/authApi";

export default function JobDetailScreen() {
  const { id } = useLocalSearchParams();
  const { token, user } = useAuth();
  const router = useRouter();

  const [job, setJob] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [applying, setApplying] = useState(false);
  const [saving, setSaving] = useState(false);
  const [applied, setApplied] = useState(false);
  const [saved, setSaved] = useState(false);

  const fetchJob = async () => {
    try {
      setLoading(true);
      const data = await getJobById(id as string);
      setJob(data);
    } catch (err) {
      Alert.alert("Error", "Failed to load job details");
    } finally {
      setLoading(false);
    }
  };

  // Check applied / saved after job loads
  useEffect(() => {
    if (job && user) {
      setApplied(job.applicants?.some((a: any) => a.user === user.id));
      setSaved(job.savedBy?.some((uid: string) => uid === user.id));
    }
  }, [job]);

  useEffect(() => { fetchJob(); }, [id]);

  const handleApply = async () => {
    setApplying(true);
    try {
      await applyForJob(token, id as string);
      Alert.alert("Success", "Application submitted!");
      fetchJob();
    } catch (err: any) {
      Alert.alert("Error", err.response?.data?.message || "Failed to apply");
    } finally {
      setApplying(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await saveJob(token, id as string);
      setSaved((s) => !s);
      Alert.alert("", saved ? "Job removed from saved list" : "Job saved!");
    } catch (err: any) {
      Alert.alert("Error", "Failed to save job");
    } finally {
      setSaving(false);
    }
  };

  const handleShare = async () => {
    try {
      await Share.share({ message: `Check out this job: ${job.title} at ${job.company}` });
    } catch {}
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#4F46E5" />
      </View>
    );
  }

  if (!job) {
    return (
      <View style={styles.centered}>
        <Ionicons name="alert-circle-outline" size={48} color="#9CA3AF" />
        <Text style={styles.errorText}>Job not found</Text>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Text style={styles.backBtnText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.screen}>

      {/* ── Top Nav ── */}
      <View style={styles.topNav}>
        <TouchableOpacity style={styles.navBtn} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={20} color="#374151" />
        </TouchableOpacity>
        <Text style={styles.navTitle} numberOfLines={1}>{job.title}</Text>
        <TouchableOpacity style={styles.navBtn} onPress={handleShare}>
          <Ionicons name="share-outline" size={20} color="#374151" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>

        {/* ── Hero Card ── */}
        <View style={styles.heroCard}>
          {/* Company avatar */}
          <View style={styles.companyAvatar}>
            <Text style={styles.companyAvatarText}>
              {job.company?.[0]?.toUpperCase() ?? "?"}
            </Text>
          </View>

          <Text style={styles.jobTitle}>{job.title}</Text>
          <Text style={styles.jobCompany}>{job.company}</Text>

          <View style={styles.metaRow}>
            {job.location && (
              <View style={styles.metaChip}>
                <Ionicons name="location-outline" size={13} color="#6B7280" />
                <Text style={styles.metaChipText}>{job.location}</Text>
              </View>
            )}
            {job.jobType && (
              <View style={styles.metaChip}>
                <Ionicons name="briefcase-outline" size={13} color="#6B7280" />
                <Text style={styles.metaChipText}>{job.jobType}</Text>
              </View>
            )}
            {job.workMode && (
              <View style={styles.metaChip}>
                <Ionicons name="home-outline" size={13} color="#6B7280" />
                <Text style={styles.metaChipText}>{job.workMode}</Text>
              </View>
            )}
          </View>

          {job.salary?.min && (
            <View style={styles.salaryRow}>
              <Ionicons name="cash-outline" size={16} color="#10B981" />
              <Text style={styles.salaryText}>
                ₹{job.salary.min} – ₹{job.salary.max}
              </Text>
            </View>
          )}

          {/* Action Buttons */}
          <View style={styles.actionRow}>
            <TouchableOpacity
              style={[styles.applyBtn, applied && styles.applyBtnDone]}
              onPress={handleApply}
              disabled={applied || applying}
            >
              {applying ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                <>
                  <Ionicons
                    name={applied ? "checkmark-circle" : "send"}
                    size={16}
                    color="#fff"
                  />
                  <Text style={styles.applyBtnText}>
                    {applied ? "Applied" : "Apply Now"}
                  </Text>
                </>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.saveBtn, saved && styles.saveBtnActive]}
              onPress={handleSave}
              disabled={saving}
            >
              <Ionicons
                name={saved ? "bookmark" : "bookmark-outline"}
                size={18}
                color={saved ? "#4F46E5" : "#374151"}
              />
              <Text style={[styles.saveBtnText, saved && styles.saveBtnTextActive]}>
                {saved ? "Saved" : "Save"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* ── Job Description ── */}
        <Card title="Job Description">
          <Text style={styles.descText}>{job.description}</Text>
        </Card>

        {/* ── Skills Required ── */}
        {job.skillsRequired?.length > 0 && (
          <Card title="Skills Required">
            <View style={styles.skillsWrap}>
              {job.skillsRequired.map((skill: string, i: number) => (
                <View key={i} style={styles.skillChip}>
                  <Text style={styles.skillText}>{skill}</Text>
                </View>
              ))}
            </View>
          </Card>
        )}

        {/* ── Job Overview ── */}
        <Card title="Job Overview">
          <View style={styles.overviewGrid}>
            <OverviewItem icon="briefcase-outline" label="Type" value={job.jobType} />
            <OverviewItem icon="home-outline" label="Work Mode" value={job.workMode} />
            <OverviewItem icon="bar-chart-outline" label="Experience" value={job.experienceRequired} />
            <OverviewItem icon="school-outline" label="Education" value={job.educationRequired} />
            {job.applicationDeadline && (
              <OverviewItem
                icon="calendar-outline"
                label="Deadline"
                value={job.applicationDeadline?.slice(0, 10)}
              />
            )}
            {job.salary?.min && (
              <OverviewItem
                icon="cash-outline"
                label="Salary"
                value={`₹${job.salary.min} – ₹${job.salary.max}`}
              />
            )}
          </View>
        </Card>

        {/* ── Mentor CTA ── */}
        <View style={styles.mentorCard}>
          <View style={styles.mentorIcon}>
            <Ionicons name="people" size={22} color="#4F46E5" />
          </View>
          <View style={styles.mentorInfo}>
            <Text style={styles.mentorTitle}>Need Guidance?</Text>
            <Text style={styles.mentorSub}>Talk to a mentor before applying for this job.</Text>
          </View>
          <TouchableOpacity
            style={styles.mentorBtn}
            onPress={() => router.push("/(app)/explore")}
          >
            <Text style={styles.mentorBtnText}>Find Mentor</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </View>
  );
}

// ── Reusable Card ─────────────────────────────────────────
function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{title}</Text>
      {children}
    </View>
  );
}

// ── Overview Item ─────────────────────────────────────────
function OverviewItem({ icon, label, value }: { icon: string; label: string; value: string }) {
  if (!value) return null;
  return (
    <View style={styles.overviewItem}>
      <View style={styles.overviewIconWrap}>
        <Ionicons name={icon as any} size={16} color="#4F46E5" />
      </View>
      <View>
        <Text style={styles.overviewLabel}>{label}</Text>
        <Text style={styles.overviewValue}>{value}</Text>
      </View>
    </View>
  );
}

// ── Styles ────────────────────────────────────────────────
const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#F3F4F6" },
  centered: { flex: 1, justifyContent: "center", alignItems: "center", gap: 12 },
  errorText: { fontSize: 16, color: "#6B7280" },
  backBtn: { backgroundColor: "#4F46E5", borderRadius: 8, paddingVertical: 10, paddingHorizontal: 24, marginTop: 8 },
  backBtnText: { color: "#fff", fontWeight: "600" },

  // Top Nav
  topNav: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", backgroundColor: "#fff", paddingHorizontal: 16, paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: "#F3F4F6", elevation: 2 },
  navBtn: { width: 36, height: 36, borderRadius: 10, backgroundColor: "#F9FAFB", alignItems: "center", justifyContent: "center" },
  navTitle: { flex: 1, fontSize: 15, fontWeight: "700", color: "#111827", textAlign: "center", marginHorizontal: 12 },

  container: { padding: 16, gap: 14, paddingBottom: 48 },

  // Hero Card
  heroCard: { backgroundColor: "#fff", borderRadius: 20, padding: 20, alignItems: "center", elevation: 2, shadowColor: "#000", shadowOpacity: 0.05, shadowRadius: 8 },
  companyAvatar: { width: 64, height: 64, borderRadius: 18, backgroundColor: "#EEF2FF", alignItems: "center", justifyContent: "center", marginBottom: 12 },
  companyAvatarText: { fontSize: 26, fontWeight: "800", color: "#4F46E5" },
  jobTitle: { fontSize: 20, fontWeight: "800", color: "#111827", textAlign: "center" },
  jobCompany: { fontSize: 14, color: "#6B7280", marginTop: 4, fontWeight: "500" },
  metaRow: { flexDirection: "row", flexWrap: "wrap", gap: 8, marginTop: 12, justifyContent: "center" },
  metaChip: { flexDirection: "row", alignItems: "center", gap: 4, backgroundColor: "#F9FAFB", borderWidth: 1, borderColor: "#F3F4F6", borderRadius: 20, paddingHorizontal: 10, paddingVertical: 5 },
  metaChipText: { fontSize: 12, color: "#6B7280", fontWeight: "500" },
  salaryRow: { flexDirection: "row", alignItems: "center", gap: 6, marginTop: 12 },
  salaryText: { fontSize: 16, fontWeight: "700", color: "#10B981" },
  actionRow: { flexDirection: "row", gap: 10, marginTop: 20, width: "100%" },
  applyBtn: { flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 8, backgroundColor: "#4F46E5", borderRadius: 12, paddingVertical: 13 },
  applyBtnDone: { backgroundColor: "#10B981" },
  applyBtnText: { color: "#fff", fontSize: 15, fontWeight: "700" },
  saveBtn: { flexDirection: "row", alignItems: "center", gap: 6, borderWidth: 1.5, borderColor: "#E5E7EB", borderRadius: 12, paddingHorizontal: 16, paddingVertical: 13 },
  saveBtnActive: { borderColor: "#4F46E5", backgroundColor: "#EEF2FF" },
  saveBtnText: { fontSize: 14, fontWeight: "600", color: "#374151" },
  saveBtnTextActive: { color: "#4F46E5" },

  // Cards
  card: { backgroundColor: "#fff", borderRadius: 16, padding: 18, elevation: 1, shadowColor: "#000", shadowOpacity: 0.04, shadowRadius: 4 },
  cardTitle: { fontSize: 16, fontWeight: "700", color: "#111827", marginBottom: 12, paddingBottom: 10, borderBottomWidth: 1, borderBottomColor: "#F3F4F6" },
  descText: { fontSize: 14, color: "#4B5563", lineHeight: 24 },

  // Skills
  skillsWrap: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  skillChip: { backgroundColor: "#F3F4F6", borderRadius: 8, paddingHorizontal: 12, paddingVertical: 6 },
  skillText: { fontSize: 13, color: "#374151", fontWeight: "500" },

  // Overview grid
  overviewGrid: { gap: 14 },
  overviewItem: { flexDirection: "row", alignItems: "center", gap: 12 },
  overviewIconWrap: { width: 36, height: 36, borderRadius: 10, backgroundColor: "#EEF2FF", alignItems: "center", justifyContent: "center" },
  overviewLabel: { fontSize: 11, color: "#9CA3AF", fontWeight: "600", textTransform: "uppercase", letterSpacing: 0.5 },
  overviewValue: { fontSize: 14, color: "#111827", fontWeight: "600", marginTop: 1 },

  // Mentor CTA
  mentorCard: { backgroundColor: "#EEF2FF", borderRadius: 16, padding: 16, flexDirection: "row", alignItems: "center", gap: 12 },
  mentorIcon: { width: 44, height: 44, borderRadius: 12, backgroundColor: "#fff", alignItems: "center", justifyContent: "center" },
  mentorInfo: { flex: 1 },
  mentorTitle: { fontSize: 14, fontWeight: "700", color: "#111827" },
  mentorSub: { fontSize: 12, color: "#6B7280", marginTop: 2 },
  mentorBtn: { backgroundColor: "#4F46E5", borderRadius: 10, paddingVertical: 9, paddingHorizontal: 14 },
  mentorBtnText: { color: "#fff", fontSize: 13, fontWeight: "700" },
});
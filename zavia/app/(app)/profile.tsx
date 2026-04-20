import { useEffect, useState } from "react";
import {
  View, Text, ScrollView, StyleSheet, ActivityIndicator,
  TouchableOpacity, Alert, RefreshControl, Image, Linking,
} from "react-native";
import { useAuth } from "../../src/context/AuthContext";
import { getProfile } from "../../src/api/authApi";
import { Ionicons } from "@expo/vector-icons";

// ── Helpers ──────────────────────────────────────────────
function getApplicationStats(applications = []) {
  const stats = { applied: 0, shortlisted: 0, rejected: 0, hired: 0 };
  applications.forEach((app) => {
    const status = app.status?.toLowerCase();
    if (stats.hasOwnProperty(status)) stats[status]++;
  });
  return stats;
}

const AVATAR_FALLBACK =
  "https://res.cloudinary.com/dru0wofgf/image/upload/profileIcon_wri6eb.png";

// ── Main Component ────────────────────────────────────────
export default function ProfileScreen() {
  const { token, logout } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [appStats, setAppStats] = useState({
    applied: 0, shortlisted: 0, rejected: 0, hired: 0,
  });

  const fetchProfile = async () => {
    try {
      const data = await getProfile(token);
      setProfile(data);
      setAppStats(getApplicationStats(data.applications));
    } catch (err) {
      Alert.alert("Error", "Failed to load profile");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => { fetchProfile(); }, []);
  const onRefresh = () => { setRefreshing(true); fetchProfile(); };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#4F46E5" />
      </View>
    );
  }

  if (!profile) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>Could not load profile.</Text>
        <TouchableOpacity style={styles.retryBtn} onPress={fetchProfile}>
          <Text style={styles.retryText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.scroll}
      contentContainerStyle={styles.container}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#4F46E5" />}
    >

      {/* ── HEADER ── */}
      <Card>
        <View style={styles.headerRow}>
          <Image
            source={{ uri: profile.avatar || AVATAR_FALLBACK }}
            style={styles.avatar}
          />
          <View style={styles.headerInfo}>
            <Text style={styles.name}>{profile.name}</Text>
            <Text style={styles.subText}>
              {[profile.jobPreferences?.roles?.join(", "), profile.location]
                .filter(Boolean).join(" • ")}
            </Text>
            <View style={styles.badgeRow}>
              {profile.openToWork && (
                <View style={[styles.badge, { backgroundColor: "#D1FAE5" }]}>
                  <Text style={[styles.badgeText, { color: "#065F46" }]}>Open to Work</Text>
                </View>
              )}
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{profile.role}</Text>
              </View>
              {profile.isEmailVerified && (
                <View style={[styles.badge, { backgroundColor: "#ECFDF5" }]}>
                  <Ionicons name="checkmark-circle" size={12} color="#10B981" />
                  <Text style={[styles.badgeText, { color: "#10B981" }]}> Verified</Text>
                </View>
              )}
            </View>
            <Text style={styles.completionText}>
              Profile Completion: {profile.profileCompletion}%
            </Text>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: `${profile.profileCompletion}%` }]} />
            </View>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionRow}>
          {profile.resume?.url && (
            <TouchableOpacity
              style={styles.primaryBtn}
              onPress={() => Linking.openURL(profile.resume.url)}
            >
              <Ionicons name="document-text-outline" size={16} color="#fff" />
              <Text style={styles.primaryBtnText}>Resume</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity style={styles.outlineBtn} onPress={logout}>
            <Ionicons name="log-out-outline" size={16} color="#EF4444" />
            <Text style={styles.outlineBtnText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </Card>

      {/* ── CAREER SUMMARY ── */}
      {profile.bio && (
        <Card title="Career Summary">
          <Text style={styles.bodyText}>{profile.bio}</Text>
        </Card>
      )}

      {/* ── PREFERENCES ── */}
      {(profile.jobPreferences?.roles?.length > 0 ||
        profile.jobPreferences?.locations?.length > 0) && (
        <View style={styles.gridRow}>
          {profile.jobPreferences?.roles?.length > 0 && (
            <Card title="Preferred Roles" style={styles.gridCard}>
              <View style={styles.infoRow}>
                <Ionicons name="briefcase-outline" size={14} color="#6B7280" />
                <Text style={styles.bodyText}>
                  {profile.jobPreferences.roles.join(", ")}
                </Text>
              </View>
            </Card>
          )}
          {profile.jobPreferences?.locations?.length > 0 && (
            <Card title="Preferred Location" style={styles.gridCard}>
              <View style={styles.infoRow}>
                <Ionicons name="location-outline" size={14} color="#6B7280" />
                <Text style={styles.bodyText}>
                  {profile.jobPreferences.locations.join(", ")}
                </Text>
              </View>
              {profile.jobPreferences?.remoteOnly && (
                <View style={[styles.infoRow, { marginTop: 6 }]}>
                  <Ionicons name="home-outline" size={14} color="#6B7280" />
                  <Text style={styles.bodyText}>Remote Only</Text>
                </View>
              )}
            </Card>
          )}
        </View>
      )}

      {/* ── SKILLS ── */}
      {profile.skills?.length > 0 && (
        <Card title="Skills">
          <View style={styles.chipWrap}>
            {profile.skills.map((skill, i) => (
              <View key={i} style={styles.chip}>
                <Text style={styles.chipText}>{skill.name}</Text>
                {skill.level && (
                  <Text style={styles.chipSub}> · {skill.level}</Text>
                )}
              </View>
            ))}
          </View>
        </Card>
      )}

      {/* ── EXPERIENCE ── */}
      {profile.experience?.length > 0 && (
        <Card title="Experience">
          {profile.experience.map((exp, i) => (
            <View key={i} style={[styles.timelineItem, i !== profile.experience.length - 1 && styles.timelineBorder]}>
              <Text style={styles.itemTitle}>{exp.role ?? exp.title}</Text>
              <Text style={styles.itemSub}>{exp.company} · {exp.duration}</Text>
              {exp.description && (
                <Text style={[styles.bodyText, { marginTop: 4 }]}>{exp.description}</Text>
              )}
            </View>
          ))}
        </Card>
      )}

      {/* ── EDUCATION ── */}
      <Card title="Education">
        {profile.education?.length > 0 ? (
          profile.education.map((edu, i) => (
            <View key={i} style={[styles.timelineItem, i !== profile.education.length - 1 && styles.timelineBorder]}>
              <Text style={styles.itemTitle}>{edu.degree}</Text>
              <Text style={styles.itemSub}>{edu.institute} · {edu.year}</Text>
              {edu.grade && <Text style={styles.bodyText}>Grade: {edu.grade}</Text>}
            </View>
          ))
        ) : (
          <Text style={styles.emptyText}>No education added</Text>
        )}
      </Card>

      {/* ── PROJECTS ── */}
      <Card title="Projects">
        {profile.projects?.length > 0 ? (
          profile.projects.map((proj, i) => (
            <View key={i} style={[styles.timelineItem, i !== profile.projects.length - 1 && styles.timelineBorder]}>
              <Text style={styles.itemTitle}>{proj.title}</Text>
              {proj.description && (
                <Text style={[styles.bodyText, { marginTop: 4 }]}>{proj.description}</Text>
              )}
              {proj.techStack?.length > 0 && (
                <View style={[styles.chipWrap, { marginTop: 8 }]}>
                  {proj.techStack.map((tech, j) => (
                    <View key={j} style={styles.techChip}>
                      <Text style={styles.techChipText}>{tech}</Text>
                    </View>
                  ))}
                </View>
              )}
              <View style={styles.linkRow}>
                {proj.githubLink && (
                  <TouchableOpacity
                    style={styles.linkBtn}
                    onPress={() => Linking.openURL(proj.githubLink)}
                  >
                    <Ionicons name="logo-github" size={14} color="#4F46E5" />
                    <Text style={styles.linkText}>GitHub</Text>
                  </TouchableOpacity>
                )}
                {proj.liveLink && (
                  <TouchableOpacity
                    style={styles.linkBtn}
                    onPress={() => Linking.openURL(proj.liveLink)}
                  >
                    <Ionicons name="globe-outline" size={14} color="#10B981" />
                    <Text style={[styles.linkText, { color: "#10B981" }]}>Live Demo</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          ))
        ) : (
          <Text style={styles.emptyText}>No projects added</Text>
        )}
      </Card>

      {/* ── STATS GRID ── */}
      <View style={styles.gridRow}>

        {/* Mentorship */}
        <Card title="Mentorship Activity" style={styles.gridCard}>
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>
                {profile.mentorshipStats?.sessionsCompleted ?? 0}
              </Text>
              <Text style={styles.statLabel}>Sessions</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>
                {profile.mentorshipStats?.mentorsConnected ?? 0}
              </Text>
              <Text style={styles.statLabel}>Mentors</Text>
            </View>
          </View>
          {profile.mentorshipStats?.careerTrack && (
            <Text style={[styles.bodyText, { marginTop: 8 }]}>
              {profile.mentorshipStats.careerTrack}
            </Text>
          )}
        </Card>

        {/* Job Applications */}
        <Card title="Job Applications" style={styles.gridCard}>
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{profile.applications?.length ?? 0}</Text>
              <Text style={styles.statLabel}>Applied</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{appStats.shortlisted}</Text>
              <Text style={styles.statLabel}>Shortlisted</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{appStats.rejected}</Text>
              <Text style={styles.statLabel}>Rejected</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{appStats.hired}</Text>
              <Text style={styles.statLabel}>Offers</Text>
            </View>
          </View>
        </Card>

      </View>

    </ScrollView>
  );
}

// ── Reusable Card ─────────────────────────────────────────
function Card({ title, children, style }: {
  title?: string;
  children: React.ReactNode;
  style?: object;
}) {
  return (
    <View style={[styles.card, style]}>
      {title && <Text style={styles.cardTitle}>{title}</Text>}
      {children}
    </View>
  );
}

// ── Styles ────────────────────────────────────────────────
const styles = StyleSheet.create({
  scroll: { flex: 1, backgroundColor: "#F3F4F6" },
  container: { padding: 16, paddingBottom: 48, gap: 16 },
  centered: { flex: 1, justifyContent: "center", alignItems: "center", gap: 12 },
  errorText: { fontSize: 16, color: "#6B7280" },
  retryBtn: { backgroundColor: "#4F46E5", borderRadius: 8, paddingVertical: 10, paddingHorizontal: 24 },
  retryText: { color: "#fff", fontWeight: "600" },

  // Card
  card: { backgroundColor: "#fff", borderRadius: 16, padding: 16, shadowColor: "#000", shadowOpacity: 0.05, shadowRadius: 6, elevation: 2 },
  cardTitle: { fontSize: 16, fontWeight: "700", color: "#111827", marginBottom: 12, paddingBottom: 8, borderBottomWidth: 1, borderBottomColor: "#F3F4F6" },

  // Header
  headerRow: { flexDirection: "row", gap: 16 },
  avatar: { width: 88, height: 88, borderRadius: 44, backgroundColor: "#E5E7EB" },
  headerInfo: { flex: 1 },
  name: { fontSize: 20, fontWeight: "bold", color: "#111827" },
  subText: { fontSize: 13, color: "#6B7280", marginTop: 2 },
  badgeRow: { flexDirection: "row", flexWrap: "wrap", gap: 6, marginTop: 8 },
  badge: { backgroundColor: "#EEF2FF", borderRadius: 20, paddingHorizontal: 10, paddingVertical: 3, flexDirection: "row", alignItems: "center" },
  badgeText: { fontSize: 11, fontWeight: "600", color: "#4F46E5" },
  completionText: { fontSize: 12, color: "#6B7280", marginTop: 8 },
  progressBar: { height: 6, backgroundColor: "#E5E7EB", borderRadius: 4, overflow: "hidden", marginTop: 4 },
  progressFill: { height: "100%", backgroundColor: "#4F46E5", borderRadius: 4 },
  actionRow: { flexDirection: "row", gap: 10, marginTop: 16 },
  primaryBtn: { flexDirection: "row", alignItems: "center", gap: 6, backgroundColor: "#4F46E5", borderRadius: 8, paddingVertical: 10, paddingHorizontal: 16 },
  primaryBtnText: { color: "#fff", fontWeight: "600", fontSize: 14 },
  outlineBtn: { flexDirection: "row", alignItems: "center", gap: 6, borderWidth: 1, borderColor: "#EF4444", borderRadius: 8, paddingVertical: 10, paddingHorizontal: 16 },
  outlineBtnText: { color: "#EF4444", fontWeight: "600", fontSize: 14 },

  // Grid
  gridRow: { flexDirection: "row", gap: 12 },
  gridCard: { flex: 1 },

  // Body
  bodyText: { fontSize: 14, color: "#6B7280", lineHeight: 22 },
  emptyText: { fontSize: 14, color: "#9CA3AF", fontStyle: "italic" },
  infoRow: { flexDirection: "row", alignItems: "flex-start", gap: 6 },

  // Timeline items
  timelineItem: { paddingVertical: 12 },
  timelineBorder: { borderBottomWidth: 1, borderBottomColor: "#F3F4F6" },
  itemTitle: { fontSize: 15, fontWeight: "600", color: "#111827" },
  itemSub: { fontSize: 13, color: "#6B7280", marginTop: 2 },

  // Chips
  chipWrap: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  chip: { flexDirection: "row", alignItems: "center", backgroundColor: "#EEF2FF", borderRadius: 20, paddingHorizontal: 12, paddingVertical: 5 },
  chipText: { fontSize: 13, color: "#4F46E5", fontWeight: "600" },
  chipSub: { fontSize: 12, color: "#818CF8" },
  techChip: { backgroundColor: "#F3F4F6", borderRadius: 20, paddingHorizontal: 10, paddingVertical: 4 },
  techChipText: { fontSize: 12, color: "#374151" },

  // Links
  linkRow: { flexDirection: "row", gap: 16, marginTop: 10 },
  linkBtn: { flexDirection: "row", alignItems: "center", gap: 4 },
  linkText: { fontSize: 13, color: "#4F46E5", fontWeight: "500" },

  // Stats
  statsRow: { flexDirection: "row", justifyContent: "space-around" },
  statItem: { alignItems: "center" },
  statNumber: { fontSize: 20, fontWeight: "bold", color: "#111827" },
  statLabel: { fontSize: 12, color: "#6B7280", marginTop: 2 },
});
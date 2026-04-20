import { useEffect, useState } from "react";
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
  ActivityIndicator, Image,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "../../src/context/AuthContext";
import { getFeaturedJobs } from "../../src/api/authApi";

const CATEGORIES = [
  { label: "Frontend", icon: "code-slash-outline" },
  { label: "Backend", icon: "server-outline" },
  { label: "UI/UX", icon: "color-palette-outline" },
  { label: "Data Science", icon: "bar-chart-outline" },
  { label: "Mobile", icon: "phone-portrait-outline" },
  { label: "DevOps", icon: "cloud-outline" },
];

const AVATAR_FALLBACK =
  "https://res.cloudinary.com/dru0wofgf/image/upload/profileIcon_wri6eb.png";

export default function HomeScreen() {
  const { user, token } = useAuth();
  const router = useRouter();
  const [featuredJobs, setFeaturedJobs] = useState([]);
  const [jobsLoading, setJobsLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const jobs = await getFeaturedJobs(token);
        setFeaturedJobs(jobs);
      } catch (err) {
        console.error("Failed to fetch featured jobs", err);
      } finally {
        setJobsLoading(false);
      }
    };
    load();
  }, []);

  return (
    <ScrollView
      style={styles.scroll}
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >

      {/* ── Hero ── */}
      <View style={styles.hero}>
        {/* Top row */}
        <View style={styles.heroTopRow}>
          <View>
            <Text style={styles.heroGreeting}>Hello, {user?.name?.split(" ")[0]} 👋</Text>
            <Text style={styles.heroTitle}>Find Your Next{"\n"}Opportunity</Text>
          </View>
          <Image source={{ uri: AVATAR_FALLBACK }} style={styles.heroAvatar} />
        </View>

        <Text style={styles.heroSub}>
          Discover jobs, connect with mentors, and take the next step in your career.
        </Text>

        {/* Hero CTA */}
        <TouchableOpacity
          style={styles.heroBtn}
          onPress={() => router.push("/(app)/explore")}
        >
          <Ionicons name="search" size={16} color="#4F46E5" />
          <Text style={styles.heroBtnText}>Browse Jobs</Text>
        </TouchableOpacity>

        {/* Stats Row */}
        <View style={styles.statsRow}>
          <StatPill icon="briefcase-outline" value="1,200+" label="Jobs" />
          <View style={styles.statsDivider} />
          <StatPill icon="people-outline" value="300+" label="Mentors" />
          <View style={styles.statsDivider} />
          <StatPill icon="checkmark-circle-outline" value="8,000+" label="Hired" />
        </View>
      </View>

      {/* ── Categories ── */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Popular Categories</Text>
          <TouchableOpacity onPress={() => router.push("/(app)/explore")}>
            <Text style={styles.seeAll}>See all</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.categoryGrid}>
          {CATEGORIES.map((cat, i) => (
            <TouchableOpacity
              key={i}
              style={styles.categoryCard}
              onPress={() => router.push("/(app)/explore")}
            >
              <View style={styles.categoryIcon}>
                <Ionicons name={cat.icon as any} size={22} color="#4F46E5" />
              </View>
              <Text style={styles.categoryLabel}>{cat.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* ── Featured Jobs ── */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Featured Jobs</Text>
          <TouchableOpacity onPress={() => router.push("/(app)/explore")}>
            <Text style={styles.seeAll}>See all</Text>
          </TouchableOpacity>
        </View>

        {jobsLoading ? (
          <View style={styles.jobSkeletonWrap}>
            {[1, 2, 3].map((i) => <JobSkeleton key={i} />)}
          </View>
        ) : featuredJobs.length === 0 ? (
          <View style={styles.emptyJobs}>
            <Ionicons name="briefcase-outline" size={32} color="#9CA3AF" />
            <Text style={styles.emptyText}>No jobs available right now</Text>
          </View>
        ) : (
          featuredJobs.map((job: any) => (
            <FeaturedJobCard
              key={job._id}
              job={job}
              onPress={() => router.push(`/(app)/job/${job._id}`)}
            />
          ))
        )}
      </View>

      {/* ── Mentor CTA ── */}
      <View style={styles.mentorBanner}>
        <View style={styles.mentorBannerLeft}>
          <Ionicons name="people" size={28} color="#4F46E5" />
          <View style={{ flex: 1 }}>
            <Text style={styles.mentorBannerTitle}>Talk to a Mentor</Text>
            <Text style={styles.mentorBannerSub}>
              Get guidance from industry experts before your next move.
            </Text>
          </View>
        </View>
        <TouchableOpacity
          style={styles.mentorBannerBtn}
          onPress={() => router.push("/(app)/explore")}
        >
          <Text style={styles.mentorBannerBtnText}>Explore</Text>
          <Ionicons name="arrow-forward" size={14} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* ── Bottom CTA ── */}
      <View style={styles.bottomCta}>
        <Text style={styles.bottomCtaTitle}>Ready to grow your career?</Text>
        <Text style={styles.bottomCtaSub}>
          Thousands of opportunities tailored to your skills are waiting.
        </Text>
        <TouchableOpacity
          style={styles.bottomCtaBtn}
          onPress={() => router.push("/(app)/explore")}
        >
          <Text style={styles.bottomCtaBtnText}>Get Started</Text>
        </TouchableOpacity>
      </View>

    </ScrollView>
  );
}

// ── Featured Job Card ─────────────────────────────────────
function FeaturedJobCard({ job, onPress }: { job: any; onPress: () => void }) {
  return (
    <TouchableOpacity style={jobCard.wrap} onPress={onPress} activeOpacity={0.85}>
      <View style={jobCard.header}>
        <View style={jobCard.avatar}>
          <Text style={jobCard.avatarText}>{job.company?.[0]?.toUpperCase() ?? "?"}</Text>
        </View>
        <View style={jobCard.info}>
          <Text style={jobCard.title} numberOfLines={1}>{job.title}</Text>
          <Text style={jobCard.company}>{job.company}</Text>
        </View>
        <View style={jobCard.typeBadge}>
          <Text style={jobCard.typeBadgeText}>{job.jobType}</Text>
        </View>
      </View>

      <View style={jobCard.divider} />

      <View style={jobCard.footer}>
        <View style={jobCard.metaItem}>
          <Ionicons name="location-outline" size={13} color="#9CA3AF" />
          <Text style={jobCard.metaText}>{job.location ?? "N/A"}</Text>
        </View>
        {job.salary?.min && (
          <View style={jobCard.metaItem}>
            <Ionicons name="cash-outline" size={13} color="#10B981" />
            <Text style={jobCard.salaryText}>₹{job.salary.min}–{job.salary.max}</Text>
          </View>
        )}
        <View style={jobCard.ctaRow}>
          <Text style={jobCard.ctaText}>View Details</Text>
          <Ionicons name="arrow-forward" size={14} color="#4F46E5" />
        </View>
      </View>
    </TouchableOpacity>
  );
}

// ── Stat Pill ─────────────────────────────────────────────
function StatPill({ icon, value, label }: { icon: string; value: string; label: string }) {
  return (
    <View style={styles.statPill}>
      <Ionicons name={icon as any} size={16} color="#fff" style={{ opacity: 0.8 }} />
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

// ── Job Skeleton ──────────────────────────────────────────
function JobSkeleton() {
  return (
    <View style={[jobCard.wrap, { gap: 12 }]}>
      <View style={{ flexDirection: "row", gap: 12, alignItems: "center" }}>
        <View style={{ width: 42, height: 42, borderRadius: 12, backgroundColor: "#F3F4F6" }} />
        <View style={{ gap: 6, flex: 1 }}>
          <View style={{ height: 13, backgroundColor: "#F3F4F6", borderRadius: 6, width: "50%" }} />
          <View style={{ height: 11, backgroundColor: "#F3F4F6", borderRadius: 6, width: "30%" }} />
        </View>
      </View>
      <View style={{ flexDirection: "row", gap: 8 }}>
        <View style={{ height: 22, width: 80, backgroundColor: "#F3F4F6", borderRadius: 8 }} />
        <View style={{ height: 22, width: 60, backgroundColor: "#F3F4F6", borderRadius: 8 }} />
      </View>
    </View>
  );
}

// ── Styles ────────────────────────────────────────────────
const styles = StyleSheet.create({
  scroll: { flex: 1, backgroundColor: "#F3F4F6" },
  container: { paddingBottom: 48 },

  // Hero
  hero: { backgroundColor: "#4F46E5", paddingHorizontal: 20, paddingTop: 24, paddingBottom: 32, borderBottomLeftRadius: 28, borderBottomRightRadius: 28 },
  heroTopRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 },
  heroGreeting: { fontSize: 14, color: "#A5B4FC", fontWeight: "500", marginBottom: 4 },
  heroTitle: { fontSize: 26, fontWeight: "800", color: "#fff", lineHeight: 34 },
  heroAvatar: { width: 48, height: 48, borderRadius: 24, borderWidth: 2, borderColor: "#6366F1" },
  heroSub: { fontSize: 14, color: "#A5B4FC", lineHeight: 22, marginBottom: 20 },
  heroBtn: { flexDirection: "row", alignItems: "center", gap: 8, backgroundColor: "#fff", alignSelf: "flex-start", borderRadius: 24, paddingVertical: 10, paddingHorizontal: 20, marginBottom: 24 },
  heroBtnText: { fontSize: 14, fontWeight: "700", color: "#4F46E5" },
  statsRow: { flexDirection: "row", alignItems: "center", backgroundColor: "rgba(255,255,255,0.12)", borderRadius: 16, padding: 14 },
  statPill: { flex: 1, alignItems: "center", gap: 2 },
  statsDivider: { width: 1, height: 36, backgroundColor: "rgba(255,255,255,0.2)" },
  statValue: { fontSize: 15, fontWeight: "800", color: "#fff" },
  statLabel: { fontSize: 11, color: "#A5B4FC", fontWeight: "500" },

  // Section
  section: { paddingHorizontal: 16, paddingTop: 24 },
  sectionHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 14 },
  sectionTitle: { fontSize: 17, fontWeight: "800", color: "#111827" },
  seeAll: { fontSize: 13, fontWeight: "600", color: "#4F46E5" },

  // Categories
  categoryGrid: { flexDirection: "row", flexWrap: "wrap", gap: 10 },
  categoryCard: { width: "30.5%", backgroundColor: "#fff", borderRadius: 14, padding: 14, alignItems: "center", gap: 8, elevation: 1, shadowColor: "#000", shadowOpacity: 0.04, shadowRadius: 4 },
  categoryIcon: { width: 44, height: 44, borderRadius: 12, backgroundColor: "#EEF2FF", alignItems: "center", justifyContent: "center" },
  categoryLabel: { fontSize: 12, fontWeight: "600", color: "#374151", textAlign: "center" },

  // Empty / skeleton
  jobSkeletonWrap: { gap: 12 },
  emptyJobs: { alignItems: "center", padding: 32, gap: 8, backgroundColor: "#fff", borderRadius: 16 },
  emptyText: { fontSize: 14, color: "#9CA3AF" },

  // Mentor Banner
  mentorBanner: { marginHorizontal: 16, marginTop: 24, backgroundColor: "#EEF2FF", borderRadius: 18, padding: 16, gap: 12 },
  mentorBannerLeft: { flexDirection: "row", alignItems: "flex-start", gap: 12 },
  mentorBannerTitle: { fontSize: 15, fontWeight: "700", color: "#111827", marginBottom: 2 },
  mentorBannerSub: { fontSize: 13, color: "#6B7280", lineHeight: 20 },
  mentorBannerBtn: { flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 6, backgroundColor: "#4F46E5", borderRadius: 12, paddingVertical: 11 },
  mentorBannerBtnText: { fontSize: 14, fontWeight: "700", color: "#fff" },

  // Bottom CTA
  bottomCta: { margin: 16, marginTop: 24, backgroundColor: "#1E1B4B", borderRadius: 20, padding: 24, alignItems: "center", gap: 8 },
  bottomCtaTitle: { fontSize: 18, fontWeight: "800", color: "#fff", textAlign: "center" },
  bottomCtaSub: { fontSize: 13, color: "#A5B4FC", textAlign: "center", lineHeight: 20 },
  bottomCtaBtn: { marginTop: 8, backgroundColor: "#4F46E5", borderRadius: 12, paddingVertical: 13, paddingHorizontal: 32 },
  bottomCtaBtnText: { fontSize: 15, fontWeight: "700", color: "#fff" },
});

const jobCard = StyleSheet.create({
  wrap: { backgroundColor: "#fff", borderRadius: 16, padding: 16, marginBottom: 12, elevation: 1, shadowColor: "#000", shadowOpacity: 0.04, shadowRadius: 4 },
  header: { flexDirection: "row", alignItems: "center", gap: 12 },
  avatar: { width: 42, height: 42, borderRadius: 12, backgroundColor: "#EEF2FF", alignItems: "center", justifyContent: "center" },
  avatarText: { fontSize: 17, fontWeight: "800", color: "#4F46E5" },
  info: { flex: 1 },
  title: { fontSize: 15, fontWeight: "700", color: "#111827" },
  company: { fontSize: 12, color: "#9CA3AF", marginTop: 2 },
  typeBadge: { backgroundColor: "#EEF2FF", borderRadius: 20, paddingHorizontal: 10, paddingVertical: 4 },
  typeBadgeText: { fontSize: 10, fontWeight: "700", color: "#4F46E5", textTransform: "uppercase" },
  divider: { height: 1, backgroundColor: "#F9FAFB", marginVertical: 10 },
  footer: { gap: 6 },
  metaItem: { flexDirection: "row", alignItems: "center", gap: 5 },
  metaText: { fontSize: 12, color: "#9CA3AF", fontWeight: "500" },
  salaryText: { fontSize: 12, color: "#10B981", fontWeight: "700" },
  ctaRow: { flexDirection: "row", alignItems: "center", gap: 4, marginTop: 6 },
  ctaText: { fontSize: 13, fontWeight: "700", color: "#4F46E5" },
});
import { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import {
  View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity,
  ActivityIndicator, Modal, Pressable, Linking,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "../../src/context/AuthContext";
import { getJobs } from "../../src/api/authApi";

// ── Job Types ─────────────────────────────────────────────
const JOB_TYPES = ["All Types", "Full-time", "Part-time", "Internship", "Contract"];

// ── Main Screen ───────────────────────────────────────────
export default function ExploreScreen() {
  const { token } = useAuth();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [filters, setFilters] = useState({ location: "", jobType: "" });
  const [pendingFilters, setPendingFilters] = useState({ location: "", jobType: "" });

  const fetchJobs = async (appliedFilters = filters) => {
    try {
      setLoading(true);
      const data = await getJobs(token, appliedFilters);
      setJobs(data);
    } catch (err) {
      console.error("Failed to fetch jobs:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchJobs(); }, []);

  const applyFilters = () => {
    setFilters(pendingFilters);
    setFilterOpen(false);
    fetchJobs(pendingFilters);
  };

  const resetFilters = () => {
    const empty = { location: "", jobType: "" };
    setPendingFilters(empty);
    setFilters(empty);
    setFilterOpen(false);
    fetchJobs(empty);
  };

  const activeFilterCount = [filters.location, filters.jobType].filter(Boolean).length;

  return (
    <View style={styles.screen}>

      {/* ── Hero Header ── */}
      <View style={styles.hero}>
        <Text style={styles.heroLabel}>OPPORTUNITIES</Text>
        <Text style={styles.heroTitle}>Explore Jobs</Text>
        <Text style={styles.heroSub}>Find opportunities that match your skills</Text>
      </View>

      {/* ── Filter Bar ── */}
      <View style={styles.filterBar}>
        <Text style={styles.resultCount}>
          {loading ? "Loading..." : `${jobs.length} result${jobs.length !== 1 ? "s" : ""} found`}
        </Text>
        <TouchableOpacity
          style={[styles.filterBtn, activeFilterCount > 0 && styles.filterBtnActive]}
          onPress={() => { setPendingFilters(filters); setFilterOpen(true); }}
        >
          <Ionicons
            name="options-outline"
            size={16}
            color={activeFilterCount > 0 ? "#fff" : "#4F46E5"}
          />
          <Text style={[styles.filterBtnText, activeFilterCount > 0 && styles.filterBtnTextActive]}>
            Filters {activeFilterCount > 0 ? `(${activeFilterCount})` : ""}
          </Text>
        </TouchableOpacity>
      </View>

      {/* ── Job List ── */}
      {loading ? (
        <SkeletonList />
      ) : jobs.length === 0 ? (
        <EmptyState />
      ) : (
        <FlatList
          data={jobs}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => <JobCard job={item} />}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
        />
      )}

      {/* ── Filter Modal ── */}
      <Modal visible={filterOpen} transparent animationType="slide" onRequestClose={() => setFilterOpen(false)}>
        <Pressable style={styles.modalOverlay} onPress={() => setFilterOpen(false)}>
          <Pressable style={styles.modalSheet}>

            {/* Modal Header */}
            <View style={styles.modalHeader}>
              <View style={styles.modalTitleRow}>
                <View style={styles.filterIcon}>
                  <Ionicons name="filter" size={14} color="#fff" />
                </View>
                <Text style={styles.modalTitle}>Filters</Text>
              </View>
              <TouchableOpacity onPress={() => setFilterOpen(false)}>
                <Ionicons name="close" size={22} color="#374151" />
              </TouchableOpacity>
            </View>

            <View style={styles.modalDivider} />

            {/* Location */}
            <View style={styles.filterGroup}>
              <Text style={styles.filterLabel}>LOCATION</Text>
              <View style={styles.inputWrap}>
                <Ionicons name="location-outline" size={16} color="#9CA3AF" />
                <TextInput
                  style={styles.input}
                  placeholder="e.g. Bangalore"
                  placeholderTextColor="#9CA3AF"
                  value={pendingFilters.location}
                  onChangeText={(v) => setPendingFilters((p) => ({ ...p, location: v }))}
                />
              </View>
            </View>

            {/* Job Type */}
            <View style={styles.filterGroup}>
              <Text style={styles.filterLabel}>JOB TYPE</Text>
              <View style={styles.chipWrap}>
                {JOB_TYPES.map((type) => {
                  const val = type === "All Types" ? "" : type;
                  const active = pendingFilters.jobType === val;
                  return (
                    <TouchableOpacity
                      key={type}
                      style={[styles.typeChip, active && styles.typeChipActive]}
                      onPress={() => setPendingFilters((p) => ({ ...p, jobType: val }))}
                    >
                      <Text style={[styles.typeChipText, active && styles.typeChipTextActive]}>
                        {type}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>

            <View style={styles.modalDivider} />

            {/* Modal Actions */}
            <View style={styles.modalActions}>
              <TouchableOpacity style={styles.resetBtn} onPress={resetFilters}>
                <Text style={styles.resetBtnText}>Reset</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.applyBtn} onPress={applyFilters}>
                <Ionicons name="search" size={16} color="#fff" />
                <Text style={styles.applyBtnText}>Apply Filters</Text>
              </TouchableOpacity>
            </View>

          </Pressable>
        </Pressable>
      </Modal>

    </View>
  );
}

// ── Job Card ──────────────────────────────────────────────
function JobCard({ job }: { job: any }) {
    const router = useRouter();
  return (
    <View style={card.wrap}>
      {/* Accent bar */}
      <View style={card.accent} />

      {/* Header */}
      <View style={card.headerRow}>
        <View style={card.avatarWrap}>
          <Text style={card.avatarText}>{job.company?.[0]?.toUpperCase() ?? "?"}</Text>
        </View>
        <View style={card.titleWrap}>
          <Text style={card.title} numberOfLines={1}>{job.title}</Text>
          <Text style={card.company}>{job.company}</Text>
        </View>
        <View style={card.typeBadge}>
          <Text style={card.typeBadgeText}>{job.jobType}</Text>
        </View>
      </View>

      <View style={card.divider} />

      {/* Meta */}
      <View style={card.metaRow}>
        {job.location && (
          <View style={card.metaItem}>
            <Ionicons name="location-outline" size={13} color="#9CA3AF" />
            <Text style={card.metaText}>{job.location}</Text>
          </View>
        )}
        {job.salary?.min && (
          <View style={card.metaItem}>
            <Ionicons name="cash-outline" size={13} color="#10B981" />
            <Text style={card.salaryText}>₹{job.salary.min}–{job.salary.max}</Text>
          </View>
        )}
      </View>

      {/* Skills */}
      {job.skillsRequired?.length > 0 && (
        <View style={card.skillsRow}>
          {job.skillsRequired.slice(0, 4).map((skill: string, i: number) => (
            <View key={i} style={card.skillChip}>
              <Text style={card.skillText}>{skill}</Text>
            </View>
          ))}
          {job.skillsRequired.length > 4 && (
            <Text style={card.moreText}>+{job.skillsRequired.length - 4} more</Text>
          )}
        </View>
      )}

      {/* CTA */}
      <TouchableOpacity
        style={card.cta}
        onPress={() => { router.push(`/(app)/job/${job._id}`) }}
      >
        <Text style={card.ctaText}>View Details</Text>
        <Ionicons name="arrow-forward" size={16} color="#4F46E5" />
      </TouchableOpacity>

    </View>
  );
}

// ── Skeleton Loader ───────────────────────────────────────
function SkeletonList() {
  return (
    <View style={styles.list}>
      {[1, 2, 3].map((i) => (
        <View key={i} style={[card.wrap, { gap: 12 }]}>
          <View style={{ flexDirection: "row", gap: 12, alignItems: "center" }}>
            <View style={skeleton.avatar} />
            <View style={{ gap: 6, flex: 1 }}>
              <View style={[skeleton.line, { width: "40%" }]} />
              <View style={[skeleton.line, { width: "25%" }]} />
            </View>
          </View>
          <View style={{ flexDirection: "row", gap: 8 }}>
            <View style={[skeleton.chip]} />
            <View style={[skeleton.chip, { width: 64 }]} />
            <View style={[skeleton.chip, { width: 48 }]} />
          </View>
        </View>
      ))}
    </View>
  );
}

// ── Empty State ───────────────────────────────────────────
function EmptyState() {
  return (
    <View style={styles.emptyWrap}>
      <View style={styles.emptyIcon}>
        <Ionicons name="sad-outline" size={32} color="#4F46E5" />
      </View>
      <Text style={styles.emptyTitle}>No jobs found</Text>
      <Text style={styles.emptySub}>Try adjusting your filters to see more results.</Text>
    </View>
  );
}

// ── Styles ────────────────────────────────────────────────
const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#F3F4F6" },

  // Hero
  hero: { backgroundColor: "#fff", borderBottomWidth: 1, borderBottomColor: "#F3F4F6", paddingHorizontal: 20, paddingVertical: 20 },
  heroLabel: { fontSize: 11, fontWeight: "800", letterSpacing: 2, color: "#4F46E5", marginBottom: 4 },
  heroTitle: { fontSize: 26, fontWeight: "800", color: "#111827", letterSpacing: -0.5 },
  heroSub: { fontSize: 13, color: "#9CA3AF", marginTop: 2 },

  // Filter Bar
  filterBar: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 16, paddingVertical: 12 },
  resultCount: { fontSize: 11, fontWeight: "700", color: "#9CA3AF", textTransform: "uppercase", letterSpacing: 1 },
  filterBtn: { flexDirection: "row", alignItems: "center", gap: 6, borderWidth: 1.5, borderColor: "#4F46E5", borderRadius: 20, paddingVertical: 7, paddingHorizontal: 14 },
  filterBtnActive: { backgroundColor: "#4F46E5" },
  filterBtnText: { fontSize: 13, fontWeight: "600", color: "#4F46E5" },
  filterBtnTextActive: { color: "#fff" },

  list: { padding: 16, gap: 12, paddingBottom: 32 },

  // Empty
  emptyWrap: { flex: 1, alignItems: "center", justifyContent: "center", gap: 10, padding: 32 },
  emptyIcon: { width: 64, height: 64, borderRadius: 20, backgroundColor: "#EEF2FF", alignItems: "center", justifyContent: "center" },
  emptyTitle: { fontSize: 16, fontWeight: "700", color: "#111827" },
  emptySub: { fontSize: 13, color: "#9CA3AF", textAlign: "center" },

  // Modal
  modalOverlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.3)", justifyContent: "flex-end" },
  modalSheet: { backgroundColor: "#fff", borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 20, gap: 16 },
  modalHeader: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  modalTitleRow: { flexDirection: "row", alignItems: "center", gap: 10 },
  filterIcon: { width: 28, height: 28, borderRadius: 8, backgroundColor: "#4F46E5", alignItems: "center", justifyContent: "center" },
  modalTitle: { fontSize: 15, fontWeight: "800", color: "#111827" },
  modalDivider: { height: 1, backgroundColor: "#F3F4F6" },
  filterGroup: { gap: 8 },
  filterLabel: { fontSize: 11, fontWeight: "700", color: "#6B7280", letterSpacing: 1 },
  inputWrap: { flexDirection: "row", alignItems: "center", gap: 10, backgroundColor: "#F9FAFB", borderWidth: 1, borderColor: "#E5E7EB", borderRadius: 12, paddingHorizontal: 14, paddingVertical: 10 },
  input: { flex: 1, fontSize: 14, color: "#111827" },
  chipWrap: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  typeChip: { borderWidth: 1.5, borderColor: "#E5E7EB", borderRadius: 20, paddingVertical: 7, paddingHorizontal: 14 },
  typeChipActive: { backgroundColor: "#4F46E5", borderColor: "#4F46E5" },
  typeChipText: { fontSize: 13, fontWeight: "600", color: "#6B7280" },
  typeChipTextActive: { color: "#fff" },
  modalActions: { flexDirection: "row", gap: 10, paddingTop: 4 },
  resetBtn: { flex: 1, borderWidth: 1.5, borderColor: "#E5E7EB", borderRadius: 12, paddingVertical: 13, alignItems: "center" },
  resetBtnText: { fontSize: 14, fontWeight: "600", color: "#374151" },
  applyBtn: { flex: 2, backgroundColor: "#4F46E5", borderRadius: 12, paddingVertical: 13, alignItems: "center", flexDirection: "row", justifyContent: "center", gap: 8 },
  applyBtnText: { fontSize: 14, fontWeight: "700", color: "#fff" },
});

const card = StyleSheet.create({
  wrap: { backgroundColor: "#fff", borderRadius: 16, padding: 16, borderWidth: 1, borderColor: "#F3F4F6", overflow: "hidden", gap: 10, elevation: 1, shadowColor: "#000", shadowOpacity: 0.04, shadowRadius: 4 },
  accent: { position: "absolute", top: 0, left: 0, right: 0, height: 3, backgroundColor: "#4F46E5", opacity: 0.15 },
  headerRow: { flexDirection: "row", alignItems: "flex-start", gap: 12 },
  avatarWrap: { width: 40, height: 40, borderRadius: 12, backgroundColor: "#EEF2FF", alignItems: "center", justifyContent: "center" },
  avatarText: { fontSize: 16, fontWeight: "800", color: "#4F46E5" },
  titleWrap: { flex: 1 },
  title: { fontSize: 15, fontWeight: "700", color: "#111827" },
  company: { fontSize: 12, color: "#9CA3AF", marginTop: 2, fontWeight: "500" },
  typeBadge: { backgroundColor: "#EEF2FF", borderRadius: 20, paddingHorizontal: 10, paddingVertical: 4 },
  typeBadgeText: { fontSize: 10, fontWeight: "700", color: "#4F46E5", textTransform: "uppercase", letterSpacing: 0.5 },
  divider: { height: 1, backgroundColor: "#F9FAFB" },
  metaRow: { flexDirection: "row", gap: 16 },
  metaItem: { flexDirection: "row", alignItems: "center", gap: 4 },
  metaText: { fontSize: 12, color: "#9CA3AF", fontWeight: "500" },
  salaryText: { fontSize: 12, color: "#10B981", fontWeight: "700" },
  skillsRow: { flexDirection: "row", flexWrap: "wrap", gap: 6 },
  skillChip: { backgroundColor: "#F9FAFB", borderWidth: 1, borderColor: "#F3F4F6", borderRadius: 8, paddingHorizontal: 10, paddingVertical: 4 },
  skillText: { fontSize: 11, color: "#6B7280", fontWeight: "500" },
  moreText: { fontSize: 11, color: "#9CA3AF", alignSelf: "center" },
  cta: { flexDirection: "row", alignItems: "center", gap: 6, marginTop: 4 },
  ctaText: { fontSize: 13, fontWeight: "700", color: "#4F46E5" },
});

const skeleton = StyleSheet.create({
  avatar: { width: 40, height: 40, borderRadius: 12, backgroundColor: "#F3F4F6" },
  line: { height: 12, backgroundColor: "#F3F4F6", borderRadius: 6, width: "60%" },
  chip: { height: 24, width: 80, backgroundColor: "#F3F4F6", borderRadius: 8 },
});
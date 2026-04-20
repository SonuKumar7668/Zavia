import { useState } from "react";
import {
    View, Text, StyleSheet, TouchableOpacity, Image,
    TextInput, Modal, Pressable, SafeAreaView, StatusBar, Platform
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "../context/AuthContext";

const AVATAR_FALLBACK =
    "https://res.cloudinary.com/dru0wofgf/image/upload/profileIcon_wri6eb.png";

export default function AppHeader() {
    const { user, logout } = useAuth();
    const router = useRouter();
    const [searchOpen, setSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const handleSearch = () => {
        if (!searchQuery.trim()) return;
        setSearchOpen(false);
        router.push(`/(app)/explore?search=${encodeURIComponent(searchQuery)}`);
        setSearchQuery("");
    };

    const handleLogout = () => {
        setDropdownOpen(false);
        logout();
    };

    return (
        <>
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.header}>

                    {/* Logo */}
                    <View style={styles.logoRow}>
                        <Image
                            source={{ uri: "https://i.ibb.co/RpYtQM5Y/logo.png" }}
                            style={styles.logoImg}
                        />
                        <Text style={styles.logoText}>Zavia</Text>
                    </View>

                    {/* Right Controls */}
                    <View style={styles.rightRow}>

                        {/* Search toggle */}
                        <TouchableOpacity
                            style={styles.iconBtn}
                            onPress={() => setSearchOpen((s) => !s)}
                        >
                            <Ionicons
                                name={searchOpen ? "close" : "search"}
                                size={22}
                                color="#374151"
                            />
                        </TouchableOpacity>

                        {/* Notification Bell */}
                        <TouchableOpacity style={styles.iconBtn}>
                            <Ionicons name="notifications-outline" size={22} color="#374151" />
                        </TouchableOpacity>

                        {/* User Avatar + Dropdown trigger */}
                        <TouchableOpacity
                            style={styles.avatarBtn}
                            onPress={() => setDropdownOpen((s) => !s)}
                        >
                            <Image
                                source={{ uri: AVATAR_FALLBACK }}
                                style={styles.avatar}
                            />
                            <Text style={styles.userName} numberOfLines={1}>
                                {user?.name?.split(" ")[0]}
                            </Text>
                            <Ionicons
                                name={dropdownOpen ? "chevron-up" : "chevron-down"}
                                size={14}
                                color="#6B7280"
                            />
                        </TouchableOpacity>

                    </View>
                </View>
            </SafeAreaView>

            {/* Search Bar — slides in below header */}
            {
                searchOpen && (
                    <View style={styles.searchBar}>
                        <View style={styles.searchInput}>
                            <Ionicons name="search" size={16} color="#9CA3AF" />
                            <TextInput
                                style={styles.searchText}
                                placeholder="Search mentors..."
                                placeholderTextColor="#9CA3AF"
                                value={searchQuery}
                                onChangeText={setSearchQuery}
                                onSubmitEditing={handleSearch}
                                returnKeyType="search"
                                autoFocus
                            />
                            {searchQuery.length > 0 && (
                                <TouchableOpacity onPress={() => setSearchQuery("")}>
                                    <Ionicons name="close-circle" size={16} color="#9CA3AF" />
                                </TouchableOpacity>
                            )}
                        </View>
                        <TouchableOpacity style={styles.searchBtn} onPress={handleSearch}>
                            <Text style={styles.searchBtnText}>Search</Text>
                        </TouchableOpacity>
                    </View>
                )
            }

            {/* Dropdown Menu */}
            <Modal
                visible={dropdownOpen}
                transparent
                animationType="fade"
                onRequestClose={() => setDropdownOpen(false)}
            >
                <Pressable style={styles.overlay} onPress={() => setDropdownOpen(false)}>
                    <View style={styles.dropdown}>

                        {/* User info */}
                        <View style={styles.dropdownHeader}>
                            <Image source={{ uri: AVATAR_FALLBACK }} style={styles.dropdownAvatar} />
                            <View>
                                <Text style={styles.dropdownName}>{user?.name}</Text>
                                <Text style={styles.dropdownRole}>{user?.role}</Text>
                            </View>
                        </View>

                        <View style={styles.divider} />

                        <DropdownItem
                            icon="person-outline"
                            label="Profile"
                            onPress={() => { setDropdownOpen(false); router.push("/(app)/profile"); }}
                        />
                        <DropdownItem
                            icon="briefcase-outline"
                            label="Applications"
                            onPress={() => { setDropdownOpen(false); router.push("/(app)/explore"); }}
                        />

                        <View style={styles.divider} />

                        {/* Logout */}
                        <TouchableOpacity style={styles.logoutItem} onPress={handleLogout}>
                            <Ionicons name="log-out-outline" size={18} color="#EF4444" />
                            <Text style={styles.logoutItemText}>Logout</Text>
                        </TouchableOpacity>

                    </View>
                </Pressable>
            </Modal>
        </>
    );
}

function DropdownItem({ icon, label, onPress }: {
    icon: string;
    label: string;
    onPress: () => void;
}) {
    return (
        <TouchableOpacity style={styles.dropdownItem} onPress={onPress}>
            <Ionicons name={icon as any} size={18} color="#374151" />
            <Text style={styles.dropdownItemText}>{label}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#fff",
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: "#F3F4F6",
        elevation: 3,
        shadowColor: "#000",
        shadowOpacity: 0.06,
        shadowRadius: 4,
    },
    safeArea: {
        backgroundColor: "#fff",
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    },

    // Logo
    logoRow: { flexDirection: "row", alignItems: "center", gap: 8 },
    logoImg: { width: 36, height: 36, borderRadius: 8 },
    logoText: { fontSize: 20, fontWeight: "800", color: "#4F46E5" },

    // Right
    rightRow: { flexDirection: "row", alignItems: "center", gap: 4 },
    iconBtn: { padding: 8 },
    avatarBtn: { flexDirection: "row", alignItems: "center", gap: 6, borderWidth: 1, borderColor: "#E5E7EB", borderRadius: 20, paddingHorizontal: 10, paddingVertical: 6, marginLeft: 4 },
    avatar: { width: 26, height: 26, borderRadius: 13, backgroundColor: "#E5E7EB" },
    userName: { fontSize: 13, fontWeight: "600", color: "#374151", maxWidth: 70 },

    // Search bar
    searchBar: { flexDirection: "row", alignItems: "center", gap: 8, backgroundColor: "#fff", paddingHorizontal: 16, paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: "#F3F4F6" },
    searchInput: { flex: 1, flexDirection: "row", alignItems: "center", gap: 8, backgroundColor: "#F9FAFB", borderWidth: 1, borderColor: "#E5E7EB", borderRadius: 24, paddingHorizontal: 14, paddingVertical: 8 },
    searchText: { flex: 1, fontSize: 14, color: "#111827" },
    searchBtn: { backgroundColor: "#4F46E5", borderRadius: 24, paddingVertical: 8, paddingHorizontal: 16 },
    searchBtnText: { color: "#fff", fontWeight: "600", fontSize: 13 },

    // Dropdown Modal
    overlay: { flex: 1 },
    dropdown: { position: "absolute", top: 64, right: 16, width: 210, backgroundColor: "#fff", borderRadius: 12, borderWidth: 1, borderColor: "#E5E7EB", shadowColor: "#000", shadowOpacity: 0.1, shadowRadius: 12, elevation: 8 },
    dropdownHeader: { flexDirection: "row", alignItems: "center", gap: 10, padding: 14 },
    dropdownAvatar: { width: 38, height: 38, borderRadius: 19, backgroundColor: "#E5E7EB" },
    dropdownName: { fontSize: 14, fontWeight: "700", color: "#111827" },
    dropdownRole: { fontSize: 12, color: "#6B7280", textTransform: "capitalize" },
    divider: { height: 1, backgroundColor: "#F3F4F6" },
    dropdownItem: { flexDirection: "row", alignItems: "center", gap: 10, paddingHorizontal: 14, paddingVertical: 12 },
    dropdownItemText: { fontSize: 14, color: "#374151", fontWeight: "500" },
    logoutItem: { flexDirection: "row", alignItems: "center", gap: 10, paddingHorizontal: 14, paddingVertical: 12 },
    logoutItemText: { fontSize: 14, color: "#EF4444", fontWeight: "600" },
});
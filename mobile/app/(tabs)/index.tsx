// app/(tabs)/index.tsx

import { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { API } from "../../services/api";

export default function Home() {
  const [mentors, setMentors] = useState<any[]>([]);
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await API.get("/");
        setMentors(res.data.mentors);
        setJobs(res.data.jobs);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <FlatList
      data={[]}
      ListHeaderComponent={
        <View style={styles.container}>
          
          {/* Mentors */}
          <Text style={styles.heading}>Top Mentors</Text>
          {mentors.map((mentor) => (
            <View key={mentor._id} style={styles.card}>
              <Text style={styles.title}>{mentor.name}</Text>
              <Text style={styles.subtitle}>{mentor.currentJob}</Text>
            </View>
          ))}

          {/* Jobs */}
          <Text style={styles.heading}>Latest Jobs</Text>
          {jobs.map((job) => (
            <View key={job._id} style={styles.card}>
              <Text style={styles.title}>{job.title}</Text>
              <Text style={styles.subtitle}>{job.company}</Text>
              <Text style={styles.location}>{job.location}</Text>
            </View>
          ))}

        </View>
      }
    />
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#FAF9F6",
    flex: 1,
  },

  heading: {
    fontSize: 22,
    fontWeight: "700",
    marginTop: 10,
    marginBottom: 8,
    color: "#00695C",
  },

  card: {
    backgroundColor: "#ffffff",
    padding: 16,
    borderRadius: 14,
    marginBottom: 12,

    // Shadow (iOS)
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 6,

    // Shadow (Android)
    elevation: 3,
  },

  title: {
    fontSize: 16,
    fontWeight: "600",
  },

  subtitle: {
    fontSize: 14,
    color: "#555",
    marginTop: 2,
  },

  location: {
    fontSize: 12,
    color: "#888",
    marginTop: 4,
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
import MentorCardSkeleton from "./MentorCardSkeleton";

function FeaturedMentor() {
    return (
        <section id="mentors" className="py-16 px-6 bg-gray-50">
            <div className="container mx-auto text-center">
                <h2 className="text-3xl font-bold mb-8">Meet Our Mentors</h2>
                <div className="grid md:grid-cols-3 gap-8">
                        <>
                            <MentorCardSkeleton />
                            <MentorCardSkeleton />
                            <MentorCardSkeleton />
                        </>
                </div>
            </div>
        </section>
    )
}
export default FeaturedMentor;
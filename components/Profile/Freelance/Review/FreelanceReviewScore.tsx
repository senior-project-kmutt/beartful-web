import ProfileSelectBarFreelance from "@/components/Profile/Freelance/ProfileSelectBar";
import FreelanceReviewList from "./FreelanceReviewList";
import { useEffect, useState } from "react";
import { IGetFreelanceReview } from "@/models/review";
import { IUser } from "@/pages/chat";
import { getFreelanceAverageScore, getFreelanceReviews } from "@/services/review/review.api";

const FreelanceReviewScore = () => {
    const [freelanceReviews, setFreelanceReviews] = useState<IGetFreelanceReview[]>();
    const [freelanceAverageScore, setFreelanceAverageScore] = useState<number>(0);
    const [user, setUser] = useState<IUser>()

    useEffect(() => {
        const user = localStorage.getItem("user") || "";
        if (user) {
            setUser(JSON.parse(user));
        }
    }, [])

    useEffect(() => {
        if (user) {
            getFreelanceReviews(user.username).subscribe((res: any) => {
                setFreelanceReviews(res.data);
            })
            getFreelanceAverageScore(user.username).subscribe((res: any) => {
                setFreelanceAverageScore(res.data);
            })
        }
    }, [user])
    return (
        <>
            <div className="flex">
            <div className="fixed inset-0 bg-white z-3 mt-20" style={{ width: '22%' }}>
                        <ProfileSelectBarFreelance activeMenu='review' />
                </div>
                {freelanceReviews && (
                <div className={`fixed mt-16 inset-0 overflow-y-auto ml-80`} style={{ maxHeight: 'calc(100vh - 32px)', zIndex: 20}}>
                                        <FreelanceReviewList title='คะแนนของฉัน' reviewsData={freelanceReviews} averageScore={freelanceAverageScore} />

                </div>
                )}
            </div>
        </>
    );
};

export default FreelanceReviewScore;
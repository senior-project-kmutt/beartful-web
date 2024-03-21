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
                <div style={{ width: '22%' }}>
                    <ProfileSelectBarFreelance activeMenu="review" />
                </div>
                {freelanceReviews && (
                    <FreelanceReviewList title='คะแนนของฉัน' reviewsData={freelanceReviews} averageScore={freelanceAverageScore} />
                )}
            </div>
        </>
    );
};

export default FreelanceReviewScore;
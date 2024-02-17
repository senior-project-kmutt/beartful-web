import ProfileSelectBarFreelance from "@/components/Profile/Freelance/ProfileSelectBar";
import FreelanceReviewList from "./FreelanceReviewList";

const FreelanceReviewScore = () => {
    return (
        <>
            <div className="flex">
                <div style={{width: '22%'}}>
                    <ProfileSelectBarFreelance activeMenu="review" />
                </div>
                <FreelanceReviewList title='คะแนนของฉัน' />
            </div>
        </>
    );
};

export default FreelanceReviewScore;
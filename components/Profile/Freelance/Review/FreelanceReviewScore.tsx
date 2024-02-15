import style from "@/styles/profile/freelance/review/freelanceReviewScore.module.scss"
import NavBar from "@/components/Layout/NavBar";
import ProfileSelectBarFreelance from "@/components/Profile/Freelance/ProfileSelectBar";
import ReviewItem from "../Review/ReviewItem";

const FreelanceReviewScore = () => {
    return (
        <>
            <NavBar />
            <div className="flex">

                <div className={style.sideBar}>
                    <ProfileSelectBarFreelance activeMenu="review" />
                </div>

                <div id="add_artwork" className={style.main}>
                    <h1 className="text-xl font-semibold mb-1">คะแนนของฉัน</h1>
                    <div className={style.overallScore}>
                        <span className="text-3xl font-bold"> 4.8 </span>
                        <span> จาก 5 คะแนน </span>
                    </div>
                    <ReviewItem />
                    <ReviewItem />
                    <ReviewItem />
                    <ReviewItem />
                    <ReviewItem />
                    <ReviewItem />
                    <ReviewItem />
                    <ReviewItem />
                    <ReviewItem />
                </div>
            </div>
        </>
    );
};

export default FreelanceReviewScore;
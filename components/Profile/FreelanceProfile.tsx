import Artwork from "@/components/Artwork/Artwork";
import { Router, useRouter } from "next/router";
import { useEffect, useState } from "react";

const Freelance: React.FC = () => {

    return (
        // ขอ mock username ไปก่อน เอามาจาก storage แหละ
        <Artwork isSpecificFreelance={true} username={"freelance_test"} isProfileEditMode={true} />
    );
};

export default Freelance;
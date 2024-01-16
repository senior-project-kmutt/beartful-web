import FreelanceArtwork from "./FreelanceArtwork";

interface Props {
    username: string
    isProfileEditMode: boolean
}

const Freelance = (props: Props) => {
    return (
        <FreelanceArtwork username={props.username} isProfileEditMode={true} />
    );
};

export default Freelance;
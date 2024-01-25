import FreelanceArtwork from "./Artwork/FreelanceArtwork";

interface Props {
    username: string
}

const Freelance = (props: Props) => {
    return (
        <FreelanceArtwork username={props.username} />
    );
};

export default Freelance;
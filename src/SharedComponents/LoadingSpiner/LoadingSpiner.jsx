import { DNA } from "react-loader-spinner";

const LoadingSpiner = ({ smallLoader }) => {
    return (
        <div className="w-full h-screen flex justify-center items-center">
            <DNA
                visible={true}
                height="80"
                width="80"
                ariaLabel="dna-loading"
                wrapperStyle={{}}
                wrapperClass="dna-wrapper"
            />
        </div>
    );
};

export default LoadingSpiner;
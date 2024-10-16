import PropTypes from "prop-types";
import { DNA } from "react-loader-spinner";

const LoadingSpiner = ({ smallLoader }) => {
    return (
        <div className={`w-full ${smallLoader === true ? 'h-full' : 'h-screen'} flex justify-center items-center dark:bg-[#292929]`}>
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

LoadingSpiner.propTypes = {
    smallLoader: PropTypes.bool
};

export default LoadingSpiner;
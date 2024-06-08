const useRefresh = () => {
    const refresh = (id, data) => {
        const filteredData = data.filter(item => item?._id !== id);
        return filteredData;
    };
    return refresh;
};

export default useRefresh;
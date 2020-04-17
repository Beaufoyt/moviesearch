const getErrorMessage = (err) => {
    return err && err.response && err.response.data && err.response.data.message
        ? err.response.data.message
        : err && err.message
            ? err.message
            : 'Bad Request';
};

module.exports = {
    getErrorMessage,
};

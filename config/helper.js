/**
 * Created by mayomi on 5/3/18 by 5:26 PM.
 */

// Set user info from request
exports.setUserInfo = function setUserInfo(request) {
    const getUserInfo = {
        _id: request._id,
        email: request.email,
    };

    return getUserInfo;
};

/**
 * Return a known Error
 * @param res
 * @param message
 * @returns {*}
 */
exports.knownError = (res, message) => {
	return res.json({
		status: false,
		message: message,
		data : null
	})
};

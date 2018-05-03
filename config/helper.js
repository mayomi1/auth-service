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
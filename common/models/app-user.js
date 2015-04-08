/**
 * Created by fsilva on 4/6/15.
 */
var config = require('../../server/config.json');
var path = require('path');
var loopback = require('loopback');

// send password reset link when requested
module.exports = function(AppUser) {
    AppUser.on('resetPasswordRequest', function (info) {
        console.log("Resetting password...");
        console.log(info.email);
        console.log(info.accessToken.id);
        var url = config.url + '#/login';
        var html = 'Click <a href="' + url + '?resetPassword=true&accessToken=' + info.accessToken.id + '&email=' + info.email + '&userId=' + info.accessToken.userId + '">here</a> to reset your password';

        console.log(html);
        loopback.Email.send({
            to: info.email,
            from: info.email,
            subject: "Password reset",
            html: html
        }, function (err) {
            if (err) return console.log('>error sending password reset email');
            console.log('> Sending password reset email to: ', info.email);
        });
    });
};
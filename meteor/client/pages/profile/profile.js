Template.profile.helpers({
    name: function () {
        return UserHelper.getFullName(this.user);
    },
    email: function () {
        return UserHelper.getEmail(this.user);
    },
    offerOptions: function () {
        return {
            panelClass: 'success',
            type: 'credits',
            icon: 'fa fa-money',
            title: 'template.offer.credits.title',
            price: {
                before: 'template.offer.credits.discount',
                after: 'template.offer.credits.price'
            },
            li: [
                'template.offer.credits.li.1',
                'template.offer.credits.li.2'
            ],
            buttonClass: 'success',
            button: 'template.offer.credits.buy',
            form: {
                value: 1,
                min: 1,
                max: 120,
                helpText: 'template.offer.credits.form.help-text',
                tooltip: 'template.offer.credits.buy'
            },
            stripe: {
                description: 'template.offer.credits.stripe.description',
                method: 'buyCredits',
                callback: function (data) {
                    openTransactionSuccessAlert({
                        data: data,
                        confirmButtonText: 'template.offer.credits.confirm',
                        callback: function () {
                            return false;
                        }
                    });
                }
            }
        };
    },
    uploadFormData: function () {
        return {
            privateKey: this.user.privateKey
        };
    },
    diskUsage: function () {
        return `${numeral(this.user.profile.diskUsage).format('0.0b')} / 10GB`;
    },
    gravatar: function () {
        return Gravatar.imageUrl(UserHelper.getEmail(this.user), {
            size: 75,
            default: 'mm'
        });
    }
});

function openTransactionSuccessAlert (options) {
    swal({
        title: 'Payment achieved with success !',
        text: Blaze.toHTML(Blaze.With(options.data, function () {
            return Template.transactionSuccess;
        })),
        html: true,
        type: 'success',
        confirmButtonColor: '#35a992',
        confirmButtonText: 'Continue'
    }, function (isConfirm) {
        if (isConfirm) {
            options.callback();
        }
    });
}
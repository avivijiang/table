require.config({
    shim: {
        'underscore': {
            export: '_'
        },
        'backbone': {
            deps: ['jquery', 'underscore'],
            export: 'Bckbone'

        }

    }
});
　require(['domready!'], function (doc) {
    //called once the dom ready
})
require(['text!review.txt', 'image!cat.jpg'], function (review, cat) {
    console.log(review);
    document.body.appendChild(cat);
})

$(document).ready(function() {

  var ENTER_KEY = 13;

});

var page = {

  url: "http://tiy-fee-rest.herokuapp.com/collections/ToDo",
  init: function() {
    page.initStyling();
    page.initEvents();
  },

  initStyling: function() {
    page.loadTasks();
  },

  initEvents: function() {


  }

  addToDoToDOM: function (task) {
      page.loadTemplate("", , $('.'));
    },
    addAllPostsToDOM: function (postCollection) {
      _.each(postCollection, page.addOnePostToDOM);
    },
    loadPosts: function () {

      $.ajax({
        url: page.url,
        method: 'GET',
        success: function (data) {
          console.log(data);
          page.addAllPostsToDOM(data);
        },
        error: function (err) {

        }
      });


    },
    createPost: function (newPost) {
      var $input = $(el.target);
      var val = $input.val().trim;

      if (el.which !== ENTER_KEY || !val) {
        return;
      }

      this.todos.push({
        title: val,
        completed: false
      });

      $input.val('');

      this.render;

      $.ajax({
        url: page.url,
        method: 'POST',
        data: newPost,
        success: function (data) {

          page.addOnePostToDOM(data);
          console.log("success!!: ", data);
        },
        error: function (err) {
          console.log("error ", err);
        }
      });

    },
    updatePost: function (editedPost, postId) {

      $.ajax({
        url: page.url + '/' + postId,
        method: 'PUT',
        data: editedPost,
        success: function (data) {
          $('.content').html('');
          page.loadPosts();

        },
        error: function (err) {}
      });


    },
    deletePost: function(e) {
      e.preventDefault();

      $.ajax({
        url: page.url + "/" + $(this).closest('article').data('id'),
        method: 'DELETE',
        success: function (data) {
          console.log(this);
          $('.content').html('');
          page.loadPosts();
        }
      });
    },

    loadTemplate: function (tmplName, data, $target) {
        var compiledTmpl = _.template(page.getTemplate(tmplName));

        $target.append(compiledTmpl(data));
      },

      getTemplate: function (name) {
        return templates[name];
      }

}

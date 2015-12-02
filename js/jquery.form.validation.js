$(document).ready(function(){

            $("#birseyler-karala").validate(
            {
                ignore: [],
              debug: false,
                rules: { 

                    content_full:{
                         required: function() 
                        {
                         CKEDITOR.instances.content_full.updateElement();
                        },

                         minlength:10
                    }
                },
                messages:
                    {

                    content_full:{
                        required:"birşeyler yazmamışsın ya la ?",
                        minlength:"en az 10 kelimelik birşey yaz da bi anlamı olsun"


                    }
                }
            });
        });
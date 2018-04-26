//IIF to keep the execution context separate. safe code
(function(global,jQuery){

    //Creating handy method for creating new object without using 'new' keyword
    var Greetr = function(firstname, lastname, language){
        return new Greetr.init(firstname, lastname, language);
    };

    //Some properties and method which we dont wan't to expose to users of the library
    //these properties would exist in external execution context and
    //functions executed in that context would have access to these properties/methods using closure
    var validlanguages = ["en", "es"];

    var greetings = {
        en: "Hello!",
        es: "Hola!"
    };

    var formalgreetings = {
        en: "Greetings",
        es: "Saludos"
    };

    var logMessage = {
        en: "Logged In",
        es: "Conectado"
    };

    var validateLanguage = function(lang){
        if(validlanguages.indexOf(lang) === -1 ){
            throw "Invalid Language";
        }
    };

    // We don't want to expose the implementation of our logging mechanism , thus this method is hidden
    var log = function (msg){
        // to check if console object exist. In some version of IE console do not exist.
        // In that case console would be undefined and JS would coarse that to be false
        if(console){
            console.log(msg);
        }
    };

    Greetr.prototype={
        // all the method provided under the prototype object would be exposed to users
        fullname: function(){
            return this.firstname+' '+this.lastname; // here this refers to the object on which this method is executed
        },
        formalGreet: function(){
            validateLanguage(this.language);
            return formalgreetings[this.language] +' '+ this.fullname();
        },
        normalGreet :  function(){
            validateLanguage(this.language);
            return greetings[this.language] +' '+ this.firstname;
        },

        // we require our methods to chainable , thus method need to return the current object from the method
        greet: function(formal){
            if(formal){
                log(this.formalGreet());
            }else {
                log(this.normalGreet());
            }
            return this; // remember chaining
        },
        logActivity : function (){
            log(logMessage[this.language] +' '+this.fullname() );
            return this;
        },
        changeLanguage : function(lang){
            validateLanguage(lang);
            this.language=lang;
            return this;
        },
        htmlGreet : function(selector, formal){
            //check if jQuery exist
            if(!$){
                throw "jQuery do not exist";
            }
            if(!selector){
                throw "Selector do not exist";
            }
            var msg = formal? this.formalGreet(): this.normalGreet();
            $(selector).html(msg);
            return this;
        }
    };

    // Actual functional constructor
    Greetr.init= function(firstname, lastname, language){
        var self= this;
        self.firstname = firstname || '';
        self.lastname = lastname || '';
        self.language = language || 'en';

        validateLanguage(self.language);
    };

     // all the objects created from the init now would have access to
     // all the method available in Greetr.prototype={}
    Greetr.init.prototype = Greetr.prototype;

    //exposing Greetr to global object
    window.Greetr = window.G$ = Greetr;
}(window, $));
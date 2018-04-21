import Controller from '@ember/controller';


export default Controller.extend({
    firebaseApp: Ember.inject.service(),
    actions: {
        submission: function(){
            var email = this.get('Email');
            var password = this.get('Contrasena');
            const auth = this.get('firebaseApp').auth();
            auth.createUserWithEmailAndPassword(email, password), function(error, userData) {
              if (error) {
                switch (error.code) {
                  case "EMAIL_TAKEN":
                    console.log("The new user account cannot be created because the email is already in use.");
                    break;
                  case "INVALID_EMAIL":
                    console.log("The specified email is not a valid email.");
                    break;
                  default:
                    console.log("Error creating user:", error);
                }
              } else {
                console.log("Successfully created user account with uid:", userData.uid);
              }
            };
        }
    }
});

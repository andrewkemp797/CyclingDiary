// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  config: {
    pageSize: 20
  },
  endpoints: {
    facebook: {
      getUserData: '/me?fields=email,gender,first_name,last_name,hometown,middle_name&access_token=',
      getProfilePic: (userId: string) => '/${userId}/picture'
    },
    auth: {
      authUser: 'http://localhost:7071/api/authorization/Auth'
    },
    event: {
      addEvent: 'http://localhost:7071/api/Events/AddEvent',
      readAllEvents: 'http://localhost:7071/api/EVents/GetAllEventsPaged',
      updateEvent: 'http://localhost:7071/api/EVents/UpdateEvent/'
    },
    comment: {
      addComment: 'http://localhost:7071/api/Comments/AddComment',
      GetEventComments: 'http://localhost:7071/api/Comment/GetEventComments/eventId/'
    }
  }
};

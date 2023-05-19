import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
//El momento ha llegado, después de un viaje comienza otro y queremos que seas parte de él.

//Deseamos celebrar nuestra boda en compañía de todos nuestros seres queridos, así que preparate, ponte guapo(a) y alista tus mejores pasos de baile. 

//Esperamos tu presencia, muchas gracias.
i18n
  // load translation using http -> see /public/locales (i.e. https://github.com/i18next/react-i18next/tree/master/example/react/public/locales)
  // learn more: https://github.com/i18next/i18next-http-backend
  // want your translations to be loaded from a professional CDN? => https://github.com/locize/react-tutorial#step-2---use-the-locize-cdn
  .use(Backend)
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    debug: true,
    //lng: 'en',
    fallbackLng: ['es','en'],
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    // interpolation: {
    //   escapeValue: false, // not needed for react as it escapes by default
    // },
    resources: {
      es: {
        translation: {
          // here we will place our translations...
          informacion: {
            fecha:' Fecha',
            date: '02 de Abril del 2022',
            ubicacion: 'Ubicación',
            regalos: 'Regalos',
            hoteles:'Hoteles',
            check: 'Confirmar',
            iglesiaLabel: 'Iglesia',
            salonLabel: 'Salón',
            descripcionLabel: 'Información',
            descripcion: 'El momento ha llegado, después de un viaje comienza otro y queremos que seas parte de él.',
            descripcion2: 'Deseamos celebrar nuestra boda en compañía de todos nuestros seres queridos, así que preparate y alista tus mejores pasos de baile.',
            descripcion3: 'Esperamos tu presencia, muchas gracias.',
            mesaRegalosLabel: 'Mesa de regalos',
            mesaRegalos: 'Si gustan contribuir con nuestro nuevo proyecto de vida lo pueden hacer.',
            datosBanco:'Datos Bancarios',
            reglasLabel: 'Indicaciones',
            reglasDescription:'Para nosotros es importante que cumplas con las indicaciones que te dejamos a continuación.',
            vestimenta: 'Codigo de vestimenta',
            vestimentaDesc: 'Formal. Traje y vestido de noche.(No blanco)',
            ninos: 'No niños',
            ninosDesc: 'Queremos que disfrutes junto con nosotros esa noche especial.',
            horario: 'Puntualidad',
            horarioDesc: 'Si no quieres perderte ni un minuto de la fiesta, por favor se puntual.',
            getUbication: 'Ver ubicación',
            bankInformation:'Datos Bancarios',
            nameCardLabel:'Titular',
            numberCardLabel:'Numero de tarjeta',
            acountCardLabel:'Número CLABE',
            bankNameLabel:'Banco',
            recomendationsLabel:'Hoteles',
            recomendationsDescription:'Aqui podras obtener descuentos por motivo de nuestra boda.',
            hotel1:'Hotel Fiesta Inn',
            hotel1Desc:'Sitio Web',
            hotel1Direc:'Codigo de Descuento',
            hotel2:'Hotel One',
            hotel2Desc:'Sitio Web',
            hotel2Direc:'Codigo de Descuento',
            hotel3:'Hotel Lucerna',
            hotel3Desc:'Sitio Web',
            hotel3Direc:'Codigo de Descuento',
            detailsHotel3: 'Mas Detalles',
            trajeLabel:'Renta de Traje',
            trajeDesc:'Casa Gerardo',
            makeupLabel:'Maquillaje',
            makeupDesc:'Algun lugar',
            asistencia: 'Confirmar asistencia',
            confirmacionLabel: 'Le agradeceríamos si pudiera confirmar su asistencia.'

          },
          time:{
              h:'Horas',
              d:'Dias',
              m:'Minutos',
              s:'Segundos'
          },
          register:{
            asistenciaTitle: 'Confirmación de asistencia',
            formAsistencia:'Asistencia',
            asistenciaLabel: '¿Asistire o no?',
            SI: 'Si asistire',
            NO: 'No asistire',
            MAYBE: 'Talvez asista',
            formNumeroInvitados: 'Número de invitados',
            formInvitados: 'Invitados',
            formCelular: 'Celular (Opcional)',
            formCelularDigital: 'Celular',
            formNombreInvitado: 'Nombre del invitado o invitada ',
            formNombreInvitadoLabel: 'Nombre de un invitado o invitada los cuales no podran asistir',
            formCall: 'Si es necesario se realizara llamado para confirmar su asistencia',
            confirmLabel: '¿Es correcta la informacion de invitados a confirmar?',
            confirm: 'Confirmar',
            numeroGuest: '# invitados',
            alerta: 'Muchas gracias por confirmar su confirmación',
            alertaError: 'Esta invitación ya fue confirmada'
        },
        tablaConfirmaciones:{
          nombreInvitadoLabel: 'Nombre Invitado',
          asistenciaLabel: 'Asistencia',
          SI: 'Si',
          NO: 'No',
          MAYBE: 'Talvez',
          numeroInvitadosLabel: 'Numero Invitados',
          botonEditLabel: 'Editar',
          botonDeleteLabel: 'Eliminar',
          actions: 'Acciones',
          fechaConfirmacion: 'Fecha Confirmacion',
          searchLabel: 'Buscar por nombre, numero de invitados o asistencia'
        },
        login:{
          title: 'Inicio Sesión',
          emailLabel: 'Correo Electronico',
          passwordLabel: 'Contraseña',
          signInButton: 'Iniciar Sesión',
          backButton:'Regresar',
          errorMessageAlreadyInUse:'No se pudo crear el usuario, el correo ya existe.',
          errorMessageFieldsEmpty:'No debe haber campos vacios',
          errorMessageNoUser: 'No se encontro ningun usuario con ese correo',
          errorMessageEmailPassword: 'El correo o la contraseña no validos, por favor intente de nuevo',
          errorMessageError: 'Ha ocurrido un error al registrarse',
          errorMessagePassword: 'La contraseña no validos, por favor intente de nuevo',
          errorMessagePasswordNoMatch: 'Las contraseñas no coninciden, por favor intente de nuevo',
          forgotPasswordButton:'Olvidó su contraseña?',
          errorMessageInvalidEmail: 'El email no es correcto',
          recover:{
            title:'Recuperar Contraseña',
            emailLabel: 'Correo Electronico',
            recoverButton: 'Enviar Email de Recuperación',
            backButton:'Regresar',
            errorMessageFieldsEmpty:'No debe haber campos vacios',
            successMessage: 'El correo se ha enviado'
          },
          signUp:{
            title:'Regsitrate',
            firstNameLabel:'Nombre',
            lastNameLabel:'Apellido',
            emailLabel:'Correo Electronico',
            passwordLabel:'Contraseña',
            confirmPasswordLabel:'Confirmar Contraseña',
            signUpButton:'Registrarme'
          },
        },
        confirmacion: {
          errorMessageFieldsEmpty:'No debe haber campos vacios',
          errorMessageError: 'Ha ocurrido un error al confirmar su invitación',
          errorMessageErrorCeroInvitados: 'No se puede confirmar 0 invitados',
          messageConfirmacion: 'Muchas gracias por su confirmación, los esperamos ahí!'
        },
        profileMenu: {
          profile: {
            title:'Perfil de',
            description:'This is a profile page. Easy to modify, always blazing fast',
            allTeamLabel: 'See all {{number}} teams',
            captainLabel:'Captain',
            adminLabel: 'Admin',
            userLabel: 'User',
            playerLabel: 'Player',
            arbitroLabel: 'Referee'
          },
        },
        notificaciones:{
          confirmacionLabel: 'ha confirmado su invitación',
          notificacionLabel: 'Notificaciones',
          noNotificacionLabel: 'No hay Notificaciones'
        },
        errorPage:{
          title:'404 Oops!',
          subtitle:'Lo lamentamos ha ocurrido un error inesperado'
        }
        }
      },
      en: {
        translation: {
          // here we will place our translations...
          informacion: {
            fecha:' Save the Date ',
            date: 'April 02, 2022',
            ubicacion: 'Location',
            regalos: 'Presents',
            hoteles: 'Hotels',
            check: 'RSVP',
            iglesiaLabel: 'Ceremony',
            salonLabel: 'Reception',
            descripcionLabel: 'Information',
            descripcion: 'It is time, we want you to be part of our trip and celebrate our wedding together in company of our family and friends, so get ready for the big day. We look forward to the big day and your attendance, thank you so much.',
            descripcion2: '',
            descripcion3: '',
            mesaRegalosLabel: 'Gifts',
            mesaRegalos: 'If you want to contribute to our life project, you can do it',
            datosBanco:'Bank transfer',
            reglasLabel: 'Pronouncements',
            reglasDescription:'For us it is important that you follow the pronouncements that we leave you below.',
            vestimenta: 'Dress Code',
            vestimentaDesc: 'Formal. Suit and Night Dress.',
            ninos: 'No kids',
            ninosDesc: 'We want you to enjoy the special night with us.',
            horario: 'Punctuality',
            horarioDesc: 'If you dont want to miss any minute of the celebration, please be there in time.',
            getUbication: 'Get location',
            bankInformation: 'Bank Information',
            nameCardLabel:'Name Card',
            numberCardLabel:'Number Card',
            acountCardLabel:'CLABE Number',
            bankNameLabel:'Bank Name',
            recomendationsLabel:'Hotels',
            recomendationsDescription:'For our wedding look for these places to get a discount.',
            hotel1:'Hotel Fiesta Inn',
            hotel1Desc:'WebSite',
            hotel1Direc:'Promo Code',
            hotel2:'Hotel One',
            hotel2Desc:'WebSite',
            hotel2Direc:'Promo Code',
            hotel3:'Hotel Lucerna',
            hotel3Desc:'WebSite',
            hotel3Direc:'Promo Code',
            detailsHotel3: 'More details',
            trajeLabel:'Suit Rental',
            trajeDesc:'Casa Gerardo',
            makeupLabel:'Beauty Salon',
            makeupDesc:'Some place',
            asistencia: 'RSVP',
            confirmacionLabel: 'We would appreciate if you could confirm your attendance or if you can not attend.'
          },
          time:{
            h:'Hours',
            d:'Days',
            m:'Minutes',
            s:'Seconds'
        },
        register:{
          asistenciaTitle: 'RSVP',
          formAsistencia:'Attendance',
          asistenciaLabel: 'YES or NO?',
          SI: 'Yes I Do',
          NO: 'No I Don´t',
          MAYBE: 'Maybe',
          formNumeroInvitados: 'Number of guests',
          formInvitados: 'Guests',
          invitadosLabel: '',
          formCelular: 'Phone (Optional)',
          formCelularDigital: 'Phone',
          formNombreInvitado: 'Name ',
          formNombreInvitadoLabel: 'Name of one person to know who won´t go',
          formCall: 'if it is necessary, we will call you to confirm your attendance',
          confirmLabel: 'Is it correct the information?',
          confirm: 'Confirm',
          numeroGuest: 'Number of Guests',
          alerta: 'Thank you very much for your confirmation',
          alertaError:'This invitation is already confirmed'
        },
      tablaConfirmaciones:{
        nombreInvitadoLabel: 'Name of guest',
        asistenciaLabel: 'Attendence',
        SI: 'Yes',
          NO: 'No',
          MAYBE: 'Maybe',
        numeroInvitadosLabel: 'Number of guests',
        botonEditLabel: 'Edit',
        botonDeleteLabel: 'Delete',
        actions: 'Actions',
        fechaConfirmacion: 'Confirmation Date',
        searchLabel: 'Search by name, number of guests or attendence'
        },
        login:{
          title: 'Sign In',
          emailLabel: 'Email Address',
          passwordLabel: 'Password',
          signInButton: 'Log In',
          backButton:'Back Home',
          errorMessageError: 'User creation encountered an error',
          errorMessagePasswordNoMatch:'Passwords do not match, please try again.',
          errorMessageAlreadyInUse:'Cannot create user, email already in use',
          errorMessageEmailPassword: 'Invalid email or password, please try again.',
          errorMessageFieldsEmpty:'No empty fields',
          errorMessageNoUser: 'No user found with this email address',
          errorMessagePassword: 'Invalid password, please try again.',
          forgotPasswordButton:'Forgot password?',
          errorMessageInvalidEmail: 'Invalid email, please try again.',
          recover:{
            title:'Forgot Password',
            emailLabel: 'Email Address',
            recoverButton: 'Send Email',
            backButton:'Back',
            errorMessageFieldsEmpty:'No empty fields',
            successMessage: 'Mail has been sent successfully'
          },
          signUp:{
            title:'Sign Up',
            firstNameLabel:'First Name',
            lastNameLabel:'Last Name',
            emailLabel:'Email Address',
            passwordLabel:'Password',
            confirmPasswordLabel:'Confirm Password',
            signUpButton:'Sign Up'
          },
        },
        confirmacion: {
          errorMessageFieldsEmpty: 'No empty fields',
          errorMessageError: 'An error occurred while trying to confirm your invitation',
          errorMessageErrorCeroInvitados: 'Cannot confirm his invitation with 0 guests user',
          messageConfirmacion: 'Thanks for confirm your attendance, see you there!'
        },
        profileMenu: {
          profile: {
            title:'Profile for',
            description:'This is a profile page. Easy to modify, always blazing fast',
            allTeamLabel: 'See all {{number}} teams',
            captainLabel:'Captain',
            adminLabel: 'Admin',
            userLabel: 'User',
            playerLabel: 'Player',
            arbitroLabel: 'Referee'
          },
        },
        notificaciones:{
          confirmacionLabel: 'has confirmed his invitation',
          notificacionLabel: 'Notifications',
          noNotificacionLabel: 'None Notifications'
        },
        errorPage:{
          title:'404 Oops!',
          subtitle:'Sorry, an unexpected error has occurred'
        }
        }
      },
    }
  });

export default i18n;
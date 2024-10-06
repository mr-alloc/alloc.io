export default defineNuxtPlugin((nuxtApp) => {
   const isHydrated = ref(false);

   if(process.client) {

       nuxtApp.hook('app:mounted', () => {

           setTimeout(() => {
               isHydrated.value = true;
           });
       });
   }

   return {
       provide: {
           isHydrated: readonly(isHydrated)
       }
   }

});

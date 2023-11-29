document.addEventListener('DOMContentLoaded' , function(){

    const email = {
        email: '',
        asunto: '',
        mensaje: ''
    }


    //seleccionar los elementos del interfaz
    const inputEmail = document.querySelector('#email');
    const inputAsunto = document.querySelector('#asunto');
    const inputMensaje = document.querySelector('#mensaje');
    const formulario = document.querySelector('#formulario');
    const btnSubmit = document.querySelector('#formulario button[type="submit"]');
    const btnReset = document.querySelector('#formulario button[type="reset"]');
    const spinner = document.querySelector('#spinner');

    //agregamos el eventListener
    //blur es para cuando un usuario abandona un campo
    inputEmail.addEventListener('input', validar);
    inputAsunto.addEventListener('input', validar);
    inputMensaje.addEventListener('input', validar);
    formulario.addEventListener('submit', enviarEmail);

    btnReset.addEventListener('click', function(e){
        e.preventDefault();
        //previene su accion por default

        resetFormulario();

    })

    function enviarEmail(e){
        e.preventDefault();

        spinner.classList.add('flex');
        spinner.classList.remove('hidden');

        setTimeout(() => {
        spinner.classList.remove('flex');
        spinner.classList.add('hidden');

        resetFormulario();

        //crear una alerta 
        const alertaExito = document.createElement('P');
        alertaExito.classList.add('bg-green-500', 'text-white', 'p-2', 'text-center', 'rounded-lg', 'mt-10', 'font-bold', 'text-sm', 'uppercase');

        alertaExito.textContent = 'Mensaje enviado correctamente';
        formulario.appendChild(alertaExito);
        
        setTimeout(() => {
            alertaExito.remove();
        }, 3000);

        }, 3000);
    }

    //validar si esta vacio
    //trim es para eliminar los espacios en una cadena
    function validar (e){
        if(e.target.value.trim() === ''){
            mostrarAlerta(`El campo ${e.target.id} es obligatorio.`, e.target.parentElement);
            email[e.target.name] = '';
            comprobarEmail();
            return;
        }

        if(e.target.id === 'email' && !validarEmail(e.target.value)){
            mostrarAlerta('El email no es valido',e.target.parentElement ); 
            comprobarEmail();
            return;
        }

        limpiarAlerta(e.target.parentElement);

        //asignar los valores
        email[e.target.name] = e.target.value.trim().toLowerCase();

        comprobarEmail();
    }

    function mostrarAlerta(mensaje, referencia){
        limpiarAlerta(referencia);

        //generar una alaerta en HTML
        const error = document.createElement('P');
        error.textContent = mensaje;
        error.classList.add('bg-red-600', 'text-white', 'p-2','text-center');

        //inyectar el error al formulario
        referencia.appendChild(error);
    }

    //limpiamos con la referencia
    function limpiarAlerta(referencia){
        const alerta = referencia.querySelector('.bg-red-600');
        if(alerta){
            alerta.remove();
        }    
    }

    //validacion para input que sea formato email
    function validarEmail(email){
        const regex =   /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/ 
        const resultado = regex.test(email);
        return resultado;
    }

    /*Toma todos los valores del objeto y los convierte en un arreglo y con .includes verifica si almenos uno de esos valores contiene un string vacio */
    function comprobarEmail(){
        if(Object.values(email).includes('')){
            btnSubmit.classList.add('opacity-50');
            btnSubmit.disabled = true;
            return
        }
        btnSubmit.classList.remove('opacity-50');
        btnSubmit.disabled = false;
    }

    function resetFormulario(){
        email.email = '';
        email.asunto = '';
        email.mensaje = '';
        formulario.reset();
        comprobarEmail();
     }

});
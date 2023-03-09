class Validator {
    constructor() {
        this.validations = [
            'data-required',
            'data-min-length',
            'data-max-length',
            'data-email-validate',
            'data-only-letters',
            'data-password-validate',
            'data-equal',
            'data-checked',
            
            
        ]
    }

    // inicia a validação dos campos
    validate(form) {

        //retorna as validações
        let currentValidations = document.querySelectorAll('form .error-validation');

        if(currentValidations.length > 0) {
            this.cleanValidations(currentValidations);
        }

        //pegar todos os inputs
        let inputs = form.getElementsByTagName('input');

        //transformar HTMLCollection em array
        let inputsArray = [...inputs];

        //loop nos inputs e validação
        inputsArray.forEach(function(input) {
            
            //loop em todas as validações existentes
            for(let i = 0; this.validations.length > i; i++) {
                //verifica se a validação atual existe no input
                if(input.getAttribute(this.validations[i]) != null){
                    
                   //data-min-length em minlength
                   //limpando a string para virar um método
                   let method = this.validations[i].replace('data-', '').replace('-', ''); 

                   //valor do input
                   let value = input.getAttribute(this.validations[i]);

                   //invocar o método
                   this[method](input, value);
                }
            }
            
        }, this);

    }

    //verifica se um input tem um número mínimo de caracteres
    minlength(input, minValue) {
        let inputLength = input.value.length;

        let errorMessage = `O campo precisa ter pelo menos ${minValue} caracteres`;

        if(inputLength < minValue){
            this.printMessage(input, errorMessage);
        }
    }

    //verifica se um input atigiu o limite de caracteres
    maxlength(input, maxValue){
        let inputLength = input.value.length;

        let errorMessage = `O campo precisa ter menos que ${maxValue} caracteres`;

        if(inputLength > maxValue){
            this.printMessage(input, errorMessage);
        }
    }

    //valida se o campo é apenas letras
    onlyletters(input) {
        let re = /^[A-Za-z]+$/;

        let inputValue = input.value;

        let errorMessage = `Este campo não aceita números e caracteres especiais`;
        
        if(!re.test(inputValue)) {
            this.printMessage(input,errorMessage);
        }
    }

    //valida e-mails
    emailvalidate(input){

        let re = /\S+@\S+\.\S+/;

        let email = input.value;

        let errorMessage = `insira um e-mail valido`;

        if(!re.test(email)) {
            this.printMessage(input, errorMessage);
        }
    }


    //verificar comparação de senhas
    equal(input, inputName){

        let inputToCompare = document.getElementsByName(inputName)[0];
        
        let errorMessage = `As senhas não conferem`;
        
        if(input.value != inputToCompare.value) {
            this.printMessage(input, errorMessage);
        }
    }

    //validar senha
    passwordvalidate(input) {

        //converter string em array
        let charArr = input.value.split("");

        let uppercases = 0;
        let numbers = 0;

        for(let i = 0; charArr.length > i; i++) {
            if(charArr[i] === charArr[i].toUpperCase() && isNaN(parseInt(charArr[i]))) {
                uppercases++;
            }else if(!isNaN(parseInt(charArr[i]))) {
                numbers++;
            }
        }

        if(uppercases === 0 || numbers === 0) {
            let errorMessage = `A senha deve ter pelo menos uma letra maiúscula e um número`;

            this.printMessage(input, errorMessage);
        }

    }

    //verificar se o input é requerido
    required(input) {

        let inputValue = input.value;

        if(inputValue === ''){
            let errorMessage = `Este campo é obrigatório`;

            this.printMessage(input, errorMessage);
        }
    }

    checked(input) {
        let inputCheck = input.checked;

        if(!inputCheck)
        {
            let errorMessage = window.alert(`Você deve concordar com os termos`)

            this.printMessage(input, errorMessage);
        }
    }

    //método para imprimir mensagem de erro na tela
    printMessage(input, msg) {

        //verificar quantidade de erros
        let errorsQty = input.parentNode.querySelector('.error-validation');

        if(errorsQty === null){
            let template = document.querySelector('.error-validation').cloneNode(true);

            template.textContent = msg;

            let inputParent = input.parentNode;

            template.classList.remove('template');

            inputParent.appendChild(template);
        }

    }

    //limpa as validações da tela
    cleanValidations(validations){
        validations.forEach(el => el.remove());
    }
}

let form = document.getElementById('register-form');
let submit = document.getElementById('btn-submit');

let validator = new Validator();

// EVENTO PARA VALIDAÇÕES
submit.addEventListener('click', function(e) {

    e.preventDefault();

    validator.validate(form);
});
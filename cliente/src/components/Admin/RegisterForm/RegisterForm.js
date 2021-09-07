import React, { useState } from "react";
import { Form, Input, Button, Checkbox, notification } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import "./RegisterForm.scss";
import {signUpApi} from "../../../api/user";
import {
  emailValidate,
  minLengthValidations,
} from "../../../utils/formValidation";
export default function RegisterForm() {
  const [state, setstate] = useState({
    email: "",
    password: "",
    repeatPassword: "",
    privacyPolicie: false,
  });

  const [formValid, setFormValid] = useState({
    email: false,
    password: false,
    repeatPassword: false,
    privacyPolicie: false,
  });

  const changeForm = (e) => {
    if (e.target.name === "privacyPolicie") {
      setstate({
        ...state,
        [e.target.name]: e.target.checked,
      });
    } else {
      setstate({
        ...state,
        [e.target.name]: e.target.value,
      });
    }
  };

  const changeValidation = (e) => {
    const { type, name } = e.target;
    // eslint-disable-next-line default-case
    switch (type) {
      case "email":
        setFormValid({...formValid,[name]:emailValidate(e.target)});
        break;
      case "password":
        setFormValid({...formValid,[name]: minLengthValidations(e.target, 6)});
        break;
      case "checkbox":
        setFormValid({...formValid,[name]: e.target.checked});
        break;
    }
    console.log(formValid);
  };

  const register = async (e) => {
    e.preventDefault();
    //const {email, password, repeatPassword, privacyPolicie} = formValid;
    const passValid = state.password;
    const repatePassValid = state.repeatPassword;
    if(!state.email || !state.privacyPolicie || !passValid || !repatePassValid){
        notification ["error"]({
            message: "Todos los campos son obligatorios"
        });
    }else{
        if(passValid!==repatePassValid){
            notification["error"]({
                message: "Las contraseñas tienen que ser iguales"
            });
        }else{
            /*notification["success"]({
                message: "Usuario creado"
            });*/
            const result = await signUpApi(state);
            if(!result.ok){
                notification["error"]({
                    message:result.message
                });
            }else{
                notification["success"]({
                    message:result.message
                })
                cleanInput();
            }
        }
    }
    //console.log(formValid);
  };
  const cleanInput = ()=>{
    const inputs = document.getElementsByTagName('input');
    for(let i=0;i<inputs.length;i++){
      inputs[i].classList.remove("sucess");
      inputs[i].classList.remove("error");
    }

    setstate({
      email: "",
      password: "",
      repeatPassword: "",
      privacyPolicie: false,
    });
    setFormValid({
      email: false,
      password: false,
      repeatPassword: false,
      privacyPolicie: false,
    });
  };
  return (
    <Form className="register-form" onChange={changeForm}>
      <Form.Item>
        <Input
          prefix={<UserOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
          type="email"
          name="email"
          placeholder="Correo electronico"
          className="register-form__input"
          onChange={changeValidation}
          value={state.email}
        />
      </Form.Item>
      <Form.Item>
        <Input
          prefix={<LockOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
          type="password"
          name="password"
          placeholder="contraseña"
          className="register-form__input"
          onChange={changeValidation}
          value={state.password}
        />
      </Form.Item>
      <Form.Item>
        <Input
          prefix={<LockOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
          type="password"
          name="repeatPassword"
          placeholder="repita la contraseña"
          className="register-form__input"
          onChange={changeValidation}
          value={state.repeatPassword}
        />
      </Form.Item>
      <Form.Item>
        <Checkbox
          name="privacyPolicie"
          checked={state.privacyPolicie}
          onChange={changeValidation}
        >
          He leido las politicas de seguridad
        </Checkbox>
      </Form.Item>
      <Form.Item>
        <Button className="register-form__button" onClick={register}>
          Crear cuenta
        </Button>
      </Form.Item>
    </Form>
  );
}

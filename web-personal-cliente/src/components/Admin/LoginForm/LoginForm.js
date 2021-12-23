import React,{ useState } from "react";
import './LoginForm.scss';
import { Form, Input, Button, notification } from "antd";
import { UserOutlined,LockOutlined} from "@ant-design/icons";
import {
    emailValidate,
    minLengthValidations,
  } from "../../../utils/formValidation";
import {signInApi} from "../../../api/user";
import {ACCESS_TOKEN, REFRESH_TOKEN} from '../../../utils/constants';
export default function LoginForm (){

    const [inputs, setInputs] = useState({
        email: "",
        password: "",
        });
  
  
    const [formValid, setFormValid] = useState({
        email: false,
        password: false,
    });
    const changeForm = (e) => {
        
           setInputs({
            ...inputs,
            [e.target.name]: e.target.value,
          });
        
        //console.log(inputs);
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
        }
        //console.log(formValid);
      };

      const login = async (e)=>{
          //console.log(inputs);
          e.preventDefault();
          const result = await signInApi(inputs);
          if(result.message){
            notification["error"]({
              message:result.message
            });
          }else{
            const {accessToken, refreshToken} = result;
            localStorage.setItem(ACCESS_TOKEN,accessToken);
            localStorage.setItem(REFRESH_TOKEN,refreshToken);

            notification["success"]({
              message:"Login correcto"
            });
            window.location.href = "/admin";
          }
          //console.log(result);
      }

    return (
        <Form className="login-form" onChange={changeForm}>
            <Form.Item>
            <Input
                prefix={<UserOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
                type="email"
                name="email"
                placeholder="Correo electronico"
                className="login-form__input"    
                onChange={changeValidation} 
                value={inputs.email}   
            />
            </Form.Item>
            <Form.Item>
            <Input
                prefix={<LockOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
                type="password"
                name="password"
                placeholder="contraseña"
                className="login-form__input"
                onChange={changeValidation}
                value={inputs.password}
            />
        </Form.Item>        
        <Form.Item>
            <Button className="login-form__button" onClick={login}>
                Ingresar
            </Button>
         </Form.Item>        
      </Form>
    );
}
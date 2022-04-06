import React, {useState, useRef} from "react";
import {View, Text, StyleSheet, TextInput, TouchableOpacity, SafeAreaView, Keyboard} from 'react-native';

import api from './src/services/api'

export default function App(){
    const [cep, setCep] = useState('');
    const inputRef = useRef(null);
    const [cepUser, setCepUser] = useState(null)

    function limpar(){
        setCep('');
        inputRef.current.focus();
        setCepUser(null);
    }

    async function buscar(){
      if(cep == ''){
            alert('Digite um CEP válido !');
            setCep('');
             return;
      }

      try {
            const response = await api.get(`/${cep}/json`);
            console.log(response.data);
            setCepUser(response.data);


            Keyboard.dismiss() //Fechar o teclado numérico após  busca

        } catch (error){
            console.log('ERROR: '+ error);
          }

    }

    return(
        <SafeAreaView style ={[styles.container, {backgroundColor:'#1C1C1C'}]}>
            <View style={{alignItems:'center'}}>
                <Text style ={styles.titulo}>Digite o CEP para consulta</Text>
                <TextInput                                                                          
                style={styles.input}
                placeholder={'Ex: 13218547 '}
                value={cep}
                onChangeText={(text)=> setCep(text)}
                keyboardType = 'numeric'
                ref={inputRef}
                />
            </View>

            <View style = {styles.areaBtn}>
                <TouchableOpacity 
                style={styles.botao}
                onPress ={buscar}
                >
                    <Text style={styles.textoBtn}>Buscar</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                style={[styles.botao, {backgroundColor:'#A9A9A9'}]}
                onPress={limpar}
                >
                    <Text style={styles.textoBtn}>Limpar</Text>
                </TouchableOpacity>

            </View>

            {cepUser &&
                <View style={styles.resultado}>
                  <Text style ={styles.itemText}>CEP: {cepUser.cep}</Text>
                  <Text style ={styles.itemText}>Logradouro:  {cepUser.logradouro}</Text>
                  <Text style ={styles.itemText}>Bairro:  {cepUser.bairro}</Text>
                  <Text style ={styles.itemText}>Cidade:  {cepUser.localidade}</Text>
                  <Text style ={styles.itemText}>Estado: {cepUser.uf}</Text>
                </View>
            }
      
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container:{ 
        flex:1,
    },
    titulo:{
        marginTop: 30,
        fontSize: 25,
        marginBottom: 30,
        color: '#FFF',
        fontWeight:'bold'
    },
    input:{
        height: 40,
        padding: 10,
        borderWidth: 1,
        backgroundColor: '#FFF',
        borderColor:'#DDD',
        borderRadius:5,
        width : '85%',
        fontSize: 15
    },
    areaBtn:{
        alignItems:'center',
        flexDirection:'row',
        marginTop: 25,
        justifyContent:'space-around'
    },
    botao:{
        height: 40,
        justifyContent:'center',
        alignItems: 'center',
        padding: 5,
        borderRadius: 8,
        backgroundColor:'#A9A9A9',
        width:100
    },
    textoBtn:{
        fontSize: 20,
        color: '#000'
    },
    resultado:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    itemText:{
        fontSize: 20,
        color: '#FFFF',
        marginBottom: 5
    }
});
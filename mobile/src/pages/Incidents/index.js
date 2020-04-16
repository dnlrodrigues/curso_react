import React, { useState, useEffect } from 'react';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { View, FlatList, Image, Text, TouchableOpacity } from 'react-native';

import api from '../../services/api';

import logoImg from '../../assets/Logo.png';

import styles from './styles';

export default function incidents(){
    const [incidents, setIncidents] = useState([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);

    const navigation = useNavigation();

    function navigationToDetail(incident){
        navigation.navigate('Detail', { incident } );
    }

    async function loadIncidents(){
        if(loading){
            console.log('Loading true');
            return;
        }

        if(total > 0 && incidents.length == total){
            console.log('O número total de páginas é maior que zero e igual ao total de registros');
            return;
        }

        setLoading(true);
        const response = await api.get('profile', {params : { page } });
        setIncidents([... incidents, ... response.data]);    
        setTotal(total + incidents.length);

        setPage(page + 1);
        setLoading(false);

    }

    useEffect( () => {
        loadIncidents();
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logoImg}/>
                <Text style={styles.headerText}> 
                    Total de <Text style={styles.headerTextBold}> {total} casos.</Text>
                </Text>
            </View>
            <Text style={styles.title}> Bem Vindo! </Text>
            <Text style={styles.description}> Escolha um dos casos abaixo e salve o dia </Text>

            <FlatList 
                style={styles.incidentsList}
                keyExtractor={incident => String(incident.id)}
                showsVerticalScrollIndicator={false}
                onEndReached={loadIncidents}
                onEndReachedThreshold={0.2}
                data={incidents} 
                renderItem={ ( { item: incident } ) => (
                    <View style={styles.incident}>
                        <Text style={styles.incidentProperty}> ONG: </Text>
                        <Text style={styles.incidentValue}> {incident.name} </Text>
                        
                        <Text style={styles.incidentProperty}> CASO: </Text>
                        <Text style={styles.incidentValue}> {incident.title} </Text>

                        <Text style={styles.incidentProperty}> VALOR: </Text>
                        <Text style={styles.incidentValue}> {Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(incident.value)} </Text>

                        <TouchableOpacity style={styles.detailsButton} onPress={() => navigationToDetail(incident)}>
                            <Text style={styles.detailsButtonText}> Ver mais detalhes </Text>
                            <Feather name="arrow-right" size={16} color="#E02041"/>
                        </TouchableOpacity>
                    </View>
                )}
            />
        </ View>
    );
}
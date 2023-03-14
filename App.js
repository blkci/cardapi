import { StatusBar } from 'expo-status-bar';
import { Alert, FlatList } from 'react-native';
import { StyleSheet, Text, View } from 'react-native';
import React, { Component, useEffect, useState } from 'react';
import axios from 'axios';
import { Avatar, Button, Card, Divider, Paragraph, Title } from 'react-native-paper';
import SafeAreaView from 'react-native-safe-area-view';


export default function App() {
  const baseURL = 'https://jsonplaceholder.typicode.com/users';
  const [data, setData] = useState([])


  useEffect(() => {

    axios.get(baseURL).then((res) => {
      setData(res.data)
    })


  }, [])
  function Delete(id) {
    axios.delete(baseURL + '/' + id).then((res) => console.log("deleted"));
    Alert.alert('Kullanıcı silindi')
  }
  function alertDelete({ item }) {

    Alert.alert('Uyarı!', `${item.name} silinecek.`, [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      { text: 'Delete', onPress: () => Delete(item.id) },
    ]);
  }

  function LeftContent(item) {
    return (
      <Avatar.Text
        label={`${item?.name.charAt(0)}`}
        color='white'
        size={50} />
    )
  }


  _renderItem = ({ item, index }) => {
    return (
      <View style={styles.container}>

        <Card style={styles.card}>

          <Card.Title title={item.name + ' (' + item.username + ')'} subtitle={item.email} left={() => LeftContent(item)} />
          <Divider bold={true} />
          <Card.Content style={styles.paragraph}>

            <Text>Street: {item.address.street}  Suite:{item.address.suite}  City:{item.address.city}  Zipcode:{item.address.zipcode}</Text>
            <Text>Phone: {item.phone}</Text>
          </Card.Content>
          <Divider bold={true} />


          <Button style={styles.button} onPress={() => alertDelete({item})}>Delete</Button>
        </Card>
      </View>
    )
  }
  return (<SafeAreaView>
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={_renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    paddingBottom: 20,
    backgroundColor: '#FFF',
  },
  paragraph: {
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: '#FFF',
  },
  item: {
    backgroundColor: 'orange',
    fontSize: 24,
  },
  card: {
    margin: 0,
    alignSelf: 'center',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'blue',
    width: '80%',
    backgroundColor: '#fff',
    fontSize: 24,
  },
  button: {
    alignSelf: 'flex-end',
    width: '30%',
    borderRadius: 10,
    borderWidth: 0,
    borderColor: '#fff',
  }
});

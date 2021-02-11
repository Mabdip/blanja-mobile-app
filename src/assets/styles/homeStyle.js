import {StyleSheet} from 'react-native';

const homeStyle = StyleSheet.create({
  container: {
    backgroundColor: 'lightblue',
  },
  text: {
    fontSize: 30,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  content: {
    backgroundColor: 'lightgrey',
    height: 200,
  },
  textContent: {
    fontSize: 20,
  },
  button: {
    borderRadius: 5,
    backgroundColor: '#99AAFF',
    borderColor: '#000033',
    borderWidth: 1,
  },
  textButton: {
    color: 'white',
    textAlign: 'center',
    fontSize: 15,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    backgroundColor: '#F194FF',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default homeStyle;
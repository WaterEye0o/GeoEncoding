import React, {
  StyleSheet,
  Component,
  View,
  Text,
  TextInput,
  TouchableHighlight,
  ListView,
  ScrollView,
  PropTypes,
  Image,
  Button
} from 'react-native';
// var _ = require('lodash');
var RefreshableListView = require('react-native-refreshable-listview')

import Database from '../database/database';

import globals from '../store/globals';

class Favourites extends View {

  constructor(props) {
    super(props);
    this.favDataSource = new ListView.DataSource( {
        rowHasChanged: (row1, row2) => row1 !== row2
    });
  }

  componentDidMount() {
    Database.loadDB().then((db) => {
      //this.loadFavourites();
      console.log(Database);
        this.props.actions.fetchFavourites(Database);
    });
  }

  loadFavourites() {
    var favs = Database.getFavourites();
    this.favDataSource.cloneWithRows(favs);
      /*.then( (result) => {
        console.log(result)
        dataSource: this.dataSource.cloneWithRows(result[0].rows);
      } )
      .done();*/
  }

  onRemovePressed(addressID, i) {
    /*Database.removeAddress(addressID)
    .then(() => {
      console.log("DELETED.  LOADING FAVS");
        this.props.actions.fetchFavourites(Database);
    });*/
      console.log("DELETED.  LOADING FAVS");
    this.props.actions.removeFavourite(Database, addressID, i, this.props.addresses._dataBlob.s1);
  }

  renderFav(rowData, i, j) {
    return(
          <View>
            <View style={styles.rowAddress}>
            <View style={styles.addressWrap}>
                <Text style={styles.address}>
                {rowData.id}: {rowData.address}</Text>
                </View>
                <TouchableHighlight onPress={this.onRemovePressed.bind(this, rowData.id, j)} underlayColor='#fff'>
                  <Image style={styles.button}
                         source={require('../../assets/ic_stat_delete.png')}
                  />
                </TouchableHighlight>
            </View>
            <View style={styles.separator}/>

      </View>
   );
  }


  render() {
    const { favourites } = this.props;
    return (
        <View style={styles.container}>
          <View style={styles.listContainer}>
            <ListView
              dataSource={favourites}
              renderRow={this.renderFav.bind(this)}
              />
          </View>
        </View>
    );
  }
}
// AddressList.propTypes = {
//   searchString : PropTypes.string,
//   addresses : PropTypes.object,
//   actions : PropTypes.objectOf(PropTypes.func)
// }

  const styles = StyleSheet.create({
    scrollView: {
    height: 600,
  },
  container: {
      marginTop:70,
  },
    listContainer: {
      flexDirection:'row',
      alignItems: 'center',
      alignSelf:'stretch',
    },
    separator:{
      height:1,
      backgroundColor:'gray'
  },
  addressWrap: {
    flexWrap: 'wrap',
    flex: 9
  },
  rowAddress:{
      padding: 5,
      flexDirection: 'row',
      alignItems: 'stretch',
      justifyContent: 'space-between',

    },
    address: {
        fontSize: 14,
    },
    button: {
      alignSelf: 'center',
      width: 20,
      height: 20,
      flex: 1
  },
  });
module.exports = Favourites

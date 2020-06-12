/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable react-native/no-inline-forgotPasswordStyle */
/* eslint-disable react/no-string-refs */
import React, { Component } from 'react';
import {
  View,
  FlatList,
  Text,
  TouchableOpacity,
  Image
} from 'react-native';
import CardView from 'react-native-cardview';
import PropTypes from 'prop-types';
import productStyle from './productStyle';
import Header from '../../components/Header';
import SwitchTextInput from '../../components/SwitchTextInput';
import AppButton from '../../components/AppButton';
import FloatingButton from '../../components/FloatingButton';
import { strings } from '../../i18next/i18n';
import { Actions } from 'react-native-router-flux';
import GlobalData from '../../utils/GlobalData';
import CommonFunctions from '../../utils/CommonFunctions';
import SearchBar from '../../components/SearchBar';
import BaseComponent from '../../BaseComponent';
import {fetchProductGET} from '../../services/FetchData';
var productConstants = require('./productConstants');
var constants = require('../../config/Constants');
var globalData = new GlobalData();
var colorConstants = require('../../config/colorConstant');

export default class ManageProducts extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = {
      searchText: ''
    };
  }

  async componentDidMount(){
    console.log("############### globalData.getBusinessId() : "+globalData.getBusinessId())
    console.log("###################### url : "+constants.GET_PRODUCT_LIST+"858323d5-53e0-419c-ae0f-dc1ba5a3f57f")
    let responseData = await fetchProductGET(constants.GET_PRODUCT_LIST+"858323d5-53e0-419c-ae0f-dc1ba5a3f57f");
    console.log("############# responseData : "+JSON.stringify(responseData))
  }



  render() {
    return (
      <View style={productStyle.container}>
        <FloatingButton onFloatButtonPressed={()=>{
          Actions.addProduct()
        }}/>
        <Header isleftArrowDisplay={true} title={strings('productScreen.manageProducts')} isCrossIconVisible={false} isleftArrowDisplay={false} />
        <SearchBar onSearchPressed={(searchText) => { this.setState({ searchText: searchText }) }} />
        <View style={{ margin: 10 }}>
          {this.renderFlatList()}
        </View>
      </View>
    );
  }

  renderFlatList() {
    return (
      <View>
        <FlatList
          data={productConstants.PRODUCT_ARRAY}
          renderItem={({ item, index }) => this.renderItemView(item, index)}
          keyExtractor={item => item.id}
          contentContainerStyle={{ paddingBottom: 10 }}
        />
      </View>
    )
  }

  renderItemView = (item, index) => {
    if (this.isValidString(item)) {
      return (
        <TouchableOpacity onPress={() => { }}>
          <View style={{ padding: 10 }}>

            <CardView
              cardElevation={8}
              cardMaxElevation={8}
              corderOverlap={false}
            >
              <View style={{ flexDirection: 'row', backgroundColor: colorConstants.WHITE_COLOR, paddingTop: 10, paddingLeft: 10, paddingBottom: 10 }}>
                <View>
                  <Text style={{ color: colorConstants.GREY_DARK_COLOR1 }}>{item.productCategory}</Text>
                  <Text style={{ color: colorConstants.BLACK_COLOR, fontSize: 18, fontWeight: 'bold' }}>{item.productName}</Text>
                </View>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                  <Text style={{ color: colorConstants.BLACK_COLOR, fontSize: 17, marginLeft: 20 }}>{"Quantity - " + item.productQuantity}</Text>
                </View>
                <View style={{ justifyContent: 'center' }}>

                  <Image source={require('../../public/images/right_arrow.png')} style={{ height: 32, width: 24 }} />

                </View>
              </View>

            </CardView>

          </View>
        </TouchableOpacity>
      )
    }
  }
}


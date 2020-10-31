import { gql } from "apollo-boost";

export const UPLOAD_FILE = gql`
  mutation SingleUpload($file: Upload!) {
    singleUpload(file: $file) {
      filename
    }
  }
`;

export const UPLOAD_FILE_STREAM = gql`
  mutation SingleUploadStream($file: Upload!) {
    singleUploadStream(file: $file) {
      filename
      mimetype
      encoding
    }
  }
`;
export const ADD_HERD = gql`
  mutation AddHerd(
    $type: String
    $price: Int
    $weight: Int
    $height: Int
    $color: String
    $age: Int
    $description: String
    $img: Upload
    $amount: Int
    $province: String
    $sum: String
    $ads_type: String
  ) {
    addHerd(
      herdType: $type
      price: $price
      weight: $weight
      height: $height
      color: $color
      age: $age
      description: $description
      img: $img
      amount: $amount
      province: $province
      sum: $sum
      ads_type: $ads_type
    ) {
      _id
      herdType
      weight
      height
      price
      color
      description
      image
      amount
      ads_type
    }
  }
`;

export const EDIT_HERD = gql`
  mutation Edit(
    $targetID: ID!
    $herdType: String
    $weight: Int
    $height: Int
    $color: String
    $price: Int
    $age: Int
    $description: String
    $image: Upload
  ) {
    editherd(
      targetID: $targetID
      herdType: $herdType
      weight: $weight
      height: $height
      color: $color
      price: $price
      age: $age
      description: $description
      image: $image
    ) {
      price
      herdType
      description
      color
      weight
      height
      image
    }
  }
`;
export const EDIT_PROFILE = gql`
  mutation EditProfileType(
    $firstname: String
    $lastname: String
    $bio: String
    $email: String
  ) {
    editProfile(
      firstname: $firstname
      lastname: $lastname
      bio: $bio
      email: $email
    ) {
      _id
      phonenumber
      bio
      firstname
      lastname
      email
    }
  }
`;
export const ADD_TEMPR = gql`
  mutation AddTempr(
    $name: String!
    $price: Int!
    $amount: Int
    $description: String
    $phonenumber: Int!
    $province: String
  ) {
    addTempr(
      name: $name
      price: $price
      amount: $amount
      description: $description
      phonenumber: $phonenumber
      province: $province
    ) {
      _id
      name
      description
      price
      amount
      phonenumber
      province
      expire_at
    }
  }
`;

export const GET_TEMPR = gql`
  {
    tempr {
      _id
      name
      price
      amount
      description
      phonenumber
      province
      expire_at
    }
  }
`;
export const GET_USER_DETAIL = gql`
  query getUser($userID: String!) {
    user(id: $userID) {
      _id
      firstname
      lastname
      phonenumber
      email
      address {
        State
        sum_or_district
        province
      }
      herds {
        _id
        price
        herdType
        height
        age
        ads_type
        weight
        description
        color
        image
        published_date
      }
    }
  }
`;
export const GET_HERD_ONLY = gql`
  {
    herds {
      _id
      herdType
      weight
      description
      height
      price
      age
      published_date
      color
      image
      ads_type
    }
  }
`;
export const GET_HERD = gql`
  query GetHerds($first: Int, $offset: Int, $dir: String) {
    herds(first: $first, offset: $offset, dir: $dir) {
      _id
      herdType
      weight
      description
      height
      price
      age
      amount
      ads_type
      color
      published_date
      image
      owner {
        _id
        phonenumber
        firstname
        lastname
      }
    }
  }
`;
export const GET_ITEM_DETAIL = gql`
  query Herd($id: ID!) {
    herd(id: $id) {
      _id
      herdType
      weight
      height
      description
      price
      age
      published_date
      color
      image
      amount
      ads_type
      owner {
        _id
        firstname
        lastname
        phonenumber
      }
    }
  }
`;
export const DELETE_HERD = gql`
  mutation DeleteHerd($targetID: ID!) {
    deleteHerd(targetID: $targetID)
  }
`;

export const REGISTER = gql`
  mutation Register($phonenumber: Int!, $password: String!) {
    register(phonenumber: $phonenumber, password: $password) {
      phonenumber
      token
      id
    }
  }
`;
export const LOGIN = gql`
  mutation Login($poe: String!, $password: String!) {
    login(phone_or_email: $poe, password: $password) {
      token
      phonenumber
      id
    }
  }
`;

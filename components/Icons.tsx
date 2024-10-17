import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import AntDesign from "@expo/vector-icons/AntDesign";
import Entypo from "@expo/vector-icons/Entypo";
import Feather from "@expo/vector-icons/Feather";
import Fontisto from "@expo/vector-icons/Fontisto";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import logo from "../assets/images_app/modelo_logo_icon_V.2..4.png";
import shy from "../assets/images_app/shy.png";
import { Image } from "react-native";
type Props = {
  color?: string;
  shown?: boolean;
  size?: number;
};

const themeIconColor = "#ee5d6c";

const PersonIcon = ({ color, size = 25 }: Props) => {
  return (
    <Ionicons
      name="person-outline"
      size={size}
      color={color}
      style={{ padding: 11 }}
    />
  );
};

const SearchIcon = ({ color, size = 25 }: Props) => {
  return (
    <AntDesign
      name="search1"
      size={size}
      color={color}
      style={{ padding: 11 }}
    />
  );
};

const EditIcon = ({ color, size = 25 }: Props) => {
  return (
    <Ionicons name="pencil" size={size} color={color} style={{ padding: 11 }} />
  );
};

const PasswordIcon = ({ color, shown, size = 25 }: Props) => {
  return (
    <Ionicons
      name={shown ? "eye-off-outline" : "eye-outline"}
      size={size}
      color={color}
      style={{ padding: 11 }}
    />
  );
};

const HappyIcon = ({ size = 60 }: Props) => {
  return <Entypo name="emoji-happy" size={size} color={themeIconColor} />;
};

const LockIcon = ({ size = 60 }: Props) => {
  return <Feather name="lock" size={size} color={themeIconColor} />;
};

const CheckIcon = ({ size = 47 }: Props) => {
  return <Feather name="check-circle" size={size} color="#066A33" />;
};

const EmailIcon = ({ size = 65 }: Props) => {
  return <Fontisto name="email" size={size} color={themeIconColor} />;
};

const ImageIcon1 = ({ size = 25 }: Props) => {
  return (
    <FontAwesome6
      name="image"
      size={size}
      color={themeIconColor}
      style={{ padding: 11 }}
    />
  );
};

const ImageIcon2 = ({ size = 60 }: Props) => {
  return (
    <MaterialCommunityIcons name="image-outline" size={size} color="#fb9062" />
  );
};

const HeartIcon = ({ shown, size = 25 }: Props) => {
  return (
    <Ionicons
      name={shown ? "heart" : "heart-outline"}
      size={size}
      color={shown ? "#fb9062" : "black"}
    />
  );
};

const StarIcon = ({ shown, size = 25 }: Props) => {
  return (
    <Ionicons
      name={shown ? "star" : "star-outline"}
      size={size}
      color={shown ? "#fb9062" : "black"}
    />
  );
};

const StarHalfIcon = ({ size = 25 }: Props) => {
  return <Ionicons name="star-half" size={size} color="#fb9062" />;
};

const CommentIcon = ({ size = 25 }: Props) => {
  return <FontAwesome6 name="comment" size={size} color="black" />;
};

const ThreeDotsIcon = ({ size = 25 }: Props) => {
  return <Entypo name="dots-three-horizontal" size={size} color="black" />;
};

const NotificationsIcon = ({ size = 25 }: Props) => {
  return (
    <MaterialCommunityIcons name="bell-outline" size={size} color="#6a0d83" />
  );
};

const HomeIcon = ({ size = 30 }: Props) => {
  return <Ionicons name="home" size={size} color={themeIconColor} />;
};

const MapMarkerIcon = ({ size = 25 }: Props) => {
  return (
    <MaterialCommunityIcons
      name="map-marker"
      size={size}
      color={themeIconColor}
    />
  );
};

const PlusIcon = ({ size = 25 }: Props) => {
  return <AntDesign name="plus" size={size} color={themeIconColor} />;
};

const FourLinesIcon = ({ size = 25 }: Props) => {
  return (
    <Ionicons name="reorder-four-outline" size={size} color={themeIconColor} />
  );
};

const TrashIcon = ({ size = 25 }: Props) => {
  return (
    <MaterialCommunityIcons
      name="trash-can-outline"
      size={size}
      color={themeIconColor}
    />
  );
};

const ArchiveIcon = ({ size = 25 }: Props) => {
  return (
    <MaterialCommunityIcons
      name="archive-arrow-down-outline"
      size={size}
      color="#eeaf61"
    />
  );
};

const SendIcon = ({ size = 27 }: Props) => {
  return <Feather name="send" size={size} color="#6A0D83" />;
};

const HashTagIcon = ({ size = 25 }: Props) => {
  return <Fontisto name="hashtag" size={size} color={themeIconColor} />;
};

const CameraIcon = ({ size = 25 }: Props) => {
  return <Feather name="camera" size={size} color={themeIconColor} />;
};

const ZoomInIcon = ({ size = 25 }: Props) => {
  return <Feather name="zoom-in" size={size} color="black" />;
};

const ZoomOutIcon = ({ size = 25 }: Props) => {
  return <Feather name="zoom-out" size={size} color="black" />;
};

const CrossDeleteIcon = ({ size = 25, color = "black" }: Props) => {
  return <Entypo name="cross" size={size} color={color} />;
};

const CancelIcon = ({ size = 25 }: Props) => {
  return <MaterialIcons name="cancel" size={size} color={themeIconColor} />;
};

const RefreshIcon = ({ size = 25 }: Props) => {
  return <Feather name="refresh-ccw" size={size} color={themeIconColor} />;
};

const ArrowIcon = ({ shown, size = 25 }: Props) => {
  return (
    <AntDesign
      name={!shown ? "right" : "down"}
      size={size}
      color={themeIconColor}
    />
  );
};

const LogOutIcon = ({ size = 25 }: Props) => {
  return <Feather name="log-out" size={size} color="#FF0000" />;
};

type pngProps = {
  width: number;
  height: number;
  mr: number;
};

const LogoIcon = ({ width = 200, height = 200, mr }: pngProps) => {
  return (
    <Image
      source={logo}
      style={{ width: width, height: height, marginRight: mr }} // Cambia los valores según lo que necesites
    />
  );
};

const ShyIcon = ({ size = 100 }: Props) => {
  return (
    <Image
      className=""
      source={shy}
      style={{ width: size, height: size }} // Cambia los valores según lo que necesites
    />
  );
};

const CalendarIcon = () => {
  return (
    <AntDesign
      name="calendar"
      size={24}
      color={themeIconColor}
      style={{ padding: 11 }}
    />
  );
};
export default {
  CalendarIcon,
  ShyIcon,
  LogoIcon,
  LogOutIcon,
  ArrowIcon,
  RefreshIcon,
  CancelIcon,
  CrossDeleteIcon,
  ZoomOutIcon,
  ZoomInIcon,
  CameraIcon,
  HashTagIcon,
  SendIcon,
  ArchiveIcon,
  TrashIcon,
  FourLinesIcon,
  PlusIcon,
  MapMarkerIcon,
  HomeIcon,
  NotificationsIcon,
  ThreeDotsIcon,
  CommentIcon,
  EmailIcon,
  PersonIcon,
  SearchIcon,
  EditIcon,
  PasswordIcon,
  HappyIcon,
  LockIcon,
  CheckIcon,
  ImageIcon1,
  ImageIcon2,
  HeartIcon,
  StarIcon,
  StarHalfIcon,
};

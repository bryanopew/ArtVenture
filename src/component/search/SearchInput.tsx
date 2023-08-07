import {styled} from 'styled-components/native';
import {colors} from '../../style/colors';
import {Icon} from '../../style/styledConst';
import {icons} from '../../assets/icons';

const SearchInput = ({
  searchText,
  setSearchText,
}: {
  searchText: string;
  setSearchText: React.Dispatch<React.SetStateAction<string>>;
}) => {
  return (
    <SearchBox>
      <Icon source={icons.searchGrey} width={20} height={20} />
      <Input
        placeholder="검색어를 입력해주세요"
        value={searchText}
        onChangeText={text => setSearchText(text)}
        onSubmitEditing={() =>
          console.log('SearchInput: onSubmit: ', searchText)
        }
      />
    </SearchBox>
  );
};

export default SearchInput;

const SearchBox = styled.View`
  height: 40px;
  flex-direction: row;
  border-color: ${colors.inactivate};
  border-width: 0.5px;
  border-radius: 40px;
  align-items: center;
  padding-left: 20px;
  margin: 0px 12px 0px 12px;
`;

const Input = styled.TextInput`
  flex: 1;
  padding: 0px 8px 0px 8px;
  font-size: 14px;
  font-family: 'SpoqaHanSansNeo-Regular';
  color: ${colors.black};
`;

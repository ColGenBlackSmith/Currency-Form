import {ChangeEvent, ReactNode, useEffect, useState } from "react";
import useFetch from "./hooks/useFetch";
import Box from "@mui/material/Container";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import AlertComponent from "./components/AlertComponent/AlertComponent";
import BackdropComponent from "./components/BackdropComponent/BackdropComponent";
import { ResponseData } from "./types/types";
import { boxStyle, inputStyle, resultCurrencyBox } from "./styles/App/styles";

function App() {
  const [currentCurrency, setCurrentCurrency] = useState("none");
  const [convertableSum, setConvertableSum] = useState<number>(0);
  const [resultSum, setResultSum] = useState<number>(0);
  const [responseData, setResponseData] = useState<ResponseData>(
    {} as ResponseData
  );

  const [currencySelectItems, setCurrencySelectItems] = useState<ReactNode[]>([
    <MenuItem value="none">Данные не загружены</MenuItem>,
  ]);

  const { isLoading, response, error } = useFetch(
    "https://www.cbr-xml-daily.ru/daily_json.js",
    {
      method: "GET",
    }
  );

  useEffect(() => {
    if (!isLoading) {
      if (!error && response) {
        setCurrencySelectItems(getSelectCurrenciesItems(response));
        setResponseData(response);
        setCurrentCurrency("USD");
      }
    }
  }, [error, isLoading, response]);

  const onCurrencyChange = (event: SelectChangeEvent) => {
    const targetCurrencyValue = responseData.Valute[event.target.value].Value;
    setCurrentCurrency(event.target.value);
    setResultSum(convertableSum * targetCurrencyValue);
  };

  const onConvertableSumChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const convertedStringToNum = parseInt(event.target.value);
    const resultValue = isNaN(convertedStringToNum) ? 0 : convertedStringToNum;
    setConvertableSum(resultValue);
    setResultSum(resultValue * responseData.Valute[currentCurrency].Value);
  };

  const getSelectCurrenciesItems = (
    responseData: ResponseData
  ): ReactNode[] => {
    return [...(Object.entries(responseData.Valute) || [])].map((item) => {
      const [ID, currencyData] = item;
      return (
        <MenuItem key={ID} value={ID}>
          <em>
            {currencyData.Name} ({currencyData.CharCode})
          </em>
        </MenuItem>
      );
    });
  };

  return (
    <>
      <Box style={boxStyle}>
        <FormControl fullWidth>
          <TextField
            id="outlined-basic"
            label="Сумма"
            variant="filled"
            style={inputStyle}
            placeholder="Введите сумму в рублях"
            onChange={onConvertableSumChange}
            disabled={isLoading || !!error}
          />
          <Select
            labelId="demo-simple-select-filled-label"
            id="demo-simple-select-filled"
            value={currentCurrency}
            onChange={onCurrencyChange}
            disabled={isLoading || !!error}
            placeholder="Выберете валюту"
          >
            {currencySelectItems}
          </Select>
          <Box style={resultCurrencyBox}>
            <TextField
              id="outlined-basic"
              label="Результат"
              variant="filled"
              style={inputStyle}
              value={resultSum}
              disabled={isLoading || !!error}
            />
            ₽
          </Box>
        </FormControl>
      </Box>
      <AlertComponent willShow={!!error} />
      <BackdropComponent willShow={isLoading} />
    </>
  );
}

export default App;

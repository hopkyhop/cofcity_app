import React from "react";
import { useSelector } from "react-redux";
import qs from "qs";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../redux/store";

import { Categories, Pagination, CoffeeBlock, Skeleton, Sort } from "../components";
import { sortList } from "../components/Sort";

import { selectFilter } from "../redux/filter/selectors";
import { selectCoffeesData } from "../redux/coffees/selectors";

import { setCategoryId, setCurrentPage, setFilters } from "../redux/filter/slice";
import { fetchCoffees } from "../redux/coffees/asyncActions";
import { SearchCoffeeParams } from "../redux/coffees/types";

const Home: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);

  const { categoryId, sort, currentPage, searchValue } =
    useSelector(selectFilter);
  const { items, status } = useSelector(selectCoffeesData);

  const onChangeCategory = React.useCallback((idx: number) => {
    dispatch(setCategoryId(idx));
  }, []);

  const onChangePage = React.useCallback((page: number) => {
    dispatch(setCurrentPage(page));
  }, []);

  const coffees = items.map((obj) => <CoffeeBlock {...obj} key={obj.id} />);
  const skeletons = [...new Array(4)].map((_, i) => <Skeleton key={i} />);

  const getCoffees = async () => {
    const category = categoryId > 0 ? `category=${categoryId}` : "";
    const sortBy = sort.sortProperty.replace("-", "");
    const order = sort.sortProperty.includes("-") ? "desc" : "asc";
    const search = searchValue ? `search=${searchValue}` : "";

    dispatch(
      fetchCoffees({
        category,
        sortBy,
        order,
        search,
        currentPage: String(currentPage),
      })
    );

    window.scrollTo(0, 0);
  };

  //Если изменили параметры и был первый рендер, вшиваем параметры в URL
  React.useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sort.sortProperty,
        categoryId,
        currentPage,
      });
      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryId, sort.sortProperty, currentPage]);

  //Если был первый рендер, то проверяем URL-параметры и сохраняем их в REDUX
  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(
        window.location.search.substring(1)
      ) as unknown as SearchCoffeeParams;
      const sort = sortList.find((obj) => obj.sortProperty === params.sortBy);
      dispatch(
        setFilters({
          searchValue: params.search,
          //@ts-ignore
          categoryId: Number(params.categoryId),
          currentPage: Number(params.currentPage),
          sort: sort || sortList[0],
        })
      );
      isSearch.current = true;
    }
  }, []);

  //Если был первый рендер и обновлены параметры в REDUX, то запрашиваем напитки
  React.useEffect(() => {
    isSearch.current = false;
    if (!isSearch.current) {
      getCoffees();
    }
  }, [categoryId, sort.sortProperty, searchValue, currentPage]);

  return (
    // useWhyDidYouUpdate('Home', {})
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={onChangeCategory} />
        <Sort value={sort} />
      </div>
      <h2 className="content__title">Все напитки</h2>
      <div className="content__items">
        {status === "error" && (
          <p className="content__error">
            Ошибка при отправке запроса. Повторите попытку позже.
          </p>
        )}
        {status === "loading" && skeletons}
        {status === "success" && coffees}
      </div>
      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  );
};

export default Home;

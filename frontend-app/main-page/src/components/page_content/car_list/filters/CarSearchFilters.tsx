import React from 'react';
import { SeatsCount } from './search_item/SeatsCount';
import { Brand } from './search_item/Brand';
import { Model } from './search_item/Model';
import { endpoints } from '../../../../constants/PathsAPI';
import { City } from './search_item/City';
import { BodyType } from './search_item/BodyType';
import { Price } from './search_item/Price';
import { DoorsCount } from './search_item/DoorsCount';
import { ProductionYear } from './search_item/ProductionYear';
import { Colour } from './search_item/Colour';

interface CarSearchFiltersState {
    brand: string | null;
    model: string | null;
    city: string | null;
    bodyType: string | null;
    minPrice: number | null;
    maxPrice: number | null;
    minSeatsCount: number | null;
    maxSeatsCount: number | null;
    minDoorsCount: number | null;
    maxDoorsCount: number | null;
    minProductionYear: number | null;
    maxProductionYear: number | null;
    colour: string | null;
    modelList: string[] | null;
}

export class CarSearchFilters extends React.Component<Record<string, never>, CarSearchFiltersState> {
    constructor(props: Record<string, never>) {
        super(props);
        this.state = {
            brand: null,
            model: null,
            city: null,
            bodyType: null,
            minPrice: null,
            maxPrice: null,
            minSeatsCount: null,
            maxSeatsCount: null,
            minDoorsCount: null,
            maxDoorsCount: null,
            minProductionYear: null,
            maxProductionYear: null,
            colour: null,
            modelList: null,
        };
    }

    // createFilterWrapperObject = () => {
    // 	var item = {};
    // 	item["brand"] = this.state.brand=="" ? null : this.state.brand;
    // 	item["model"] = this.state.model=="" ? null : this.state.model;
    // 	item["city"] = this.state.city=="" ? null : this.state.city;
    // 	item["bodyType"] = this.state.bodyType=="" ? null : this.state.bodyType;
    // 	item["priceFrom"] = this.state.priceFrom=="" ? null : this.state.priceFrom;
    // 	item["priceTo"] = this.state.priceTo=="" ? null : this.state.priceTo;
    // 	item["placesNumberFrom"] = this.state.placesNumberFrom=="" ? null : this.state.placesNumberFrom;
    // 	item["placesNumberTo"] = this.state.placesNumberTo=="" ? null : this.state.placesNumberTo;
    // 	item["doorsNumberFrom"] = this.state.doorsNumberFrom=="" ? null : this.state.doorsNumberFrom;
    // 	item["doorsNumberTo"] = this.state.doorsNumberTo=="" ? null : this.state.doorsNumberTo;
    // 	item["productionYearFrom"] = this.state.productionYearFrom=="" ? null : this.state.productionYearFrom;
    // 	item["productionYearTo"] = this.state.productionYearTo=="" ? null : this.state.productionYearTo;
    // 	item["color"] = this.state.color=="" ? null : this.state.color;
    //
    // 	return item;
    // }
    //
    // handleSubmit = (event) => {
    // 		event.preventDefault();
    // 		const item = this.createFilterWrapperObject();
    // 		const filterWrapperObjectJson = JSON.stringify(item);
    //
    //
    // 		this.props.history.push({
    // 		pathname: '/CarRental/searchresult',
    // 		state: { filterWrapperObjectJson: filterWrapperObjectJson }
    // 		})
    // }

    setBrand = (brand: string): void => {
        this.setState({
            brand: brand,
        });

        fetch(endpoints.brandModelsListEndpoint(brand)).then((response: Response) => {
            response.json().then((json: string[]) => {
                this.setState({ modelList: json });
            });
        });
    };

    setModel = (model: string): void => {
        this.setState({
            model: model,
        });
    };

    setCity = (city: string): void => {
        this.setState({
            city: city,
        });
    };

    setBodyType = (bodyType: string): void => {
        this.setState({
            bodyType: bodyType,
        });
    };

    setMinPrice = (minPrice: number): void => {
        this.setState({
            minPrice: minPrice,
        });
    };

    setMaxPrice = (maxPrice: number): void => {
        this.setState({
            maxPrice: maxPrice,
        });
    };

    setMinSeatsCount = (minSeatsCount: number): void => {
        this.setState({
            minSeatsCount: minSeatsCount,
        });
    };

    setMaxSeatsCount = (maxSeatsCount: number): void => {
        this.setState({
            maxSeatsCount: maxSeatsCount,
        });
    };

    setMinDoorsCount = (minDoorsCount: number): void => {
        this.setState({
            minDoorsCount: minDoorsCount,
        });
    };

    setMaxDoorsCount = (maxDoorsCount: number): void => {
        this.setState({
            maxDoorsCount: maxDoorsCount,
        });
    };

    setMinProductionYear = (minProductionYear: number): void => {
        this.setState({
            minProductionYear: minProductionYear,
        });
    };

    setMaxProductionYear = (maxProductionYear: number): void => {
        this.setState({
            maxProductionYear: maxProductionYear,
        });
    };

    setColour = (colour: string): void => {
        this.setState({
            colour: colour,
        });
    };

    handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
        event.preventDefault();
    };

    render(): JSX.Element {
        const {
            brand,
            modelList,
            model,
            city,
            bodyType,
            minPrice,
            maxPrice,
            minSeatsCount,
            maxSeatsCount,
            minDoorsCount,
            maxDoorsCount,
            minProductionYear,
            maxProductionYear,
            colour,
        } = this.state;

        return (
            <div className="card shadow">
                <div id="search-filter-container" className="card-body">
                    <form onSubmit={this.handleSubmit}>
                        <Brand brand={brand} setBrand={this.setBrand} />
                        <Model modelList={modelList} model={model} setModel={this.setModel} />
                        <City city={city} setCity={this.setCity} />
                        <BodyType bodyType={bodyType} setBodyType={this.setBodyType} />
                        <Price
                            setMinPrice={this.setMinPrice}
                            setMaxPrice={this.setMaxPrice}
                            minPrice={minPrice}
                            maxPrice={maxPrice}
                        />
                        <SeatsCount
                            setMinSeatsCount={this.setMinSeatsCount}
                            setMaxSeatsCount={this.setMaxSeatsCount}
                            minSeatsCount={minSeatsCount}
                            maxSeatsCount={maxSeatsCount}
                        />
                        <DoorsCount
                            setMinDoorsCount={this.setMinDoorsCount}
                            setMaxDoorsCount={this.setMaxDoorsCount}
                            minDoorsCount={minDoorsCount}
                            maxDoorsCount={maxDoorsCount}
                        />
                        <ProductionYear
                            setMinProductionYear={this.setMinProductionYear}
                            setMaxProductionYear={this.setMaxProductionYear}
                            minProductionYear={minProductionYear}
                            maxProductionYear={maxProductionYear}
                        />
                        <Colour colour={colour} setColour={this.setColour} />
                        <input type="submit" value="Search" className="btn btn-primary" />
                    </form>
                </div>
            </div>
        );
    }
}

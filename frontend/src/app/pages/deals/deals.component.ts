import { Component, OnInit } from "@angular/core";
import { DealsService } from "src/app/services/deals.service";
import { CategoriesService } from "src/app/services/categories.service";

@Component({
    selector: "app-deals",
    templateUrl: "./deals.component.html",
    styleUrls: ["./deals.component.scss"],
})
export class DealsComponent implements OnInit {
    constructor(public dealsService: DealsService, public categoriesService: CategoriesService) {}

    async ngOnInit() {
        if (!this.categoriesService.activeCategory) {
            await this.categoriesService.getCategories();
            this.categoriesService.activeCategory = this.categoriesService.categories[0];
        }
        // Only fetch deals on init if they are empty
        if (this.dealsService.deals.length === 0) {
            const categoryIndex =
                this.categoriesService.categories.findIndex(cat => cat === this.categoriesService.activeCategory) + 1;
            console.log(categoryIndex);
            this.dealsService.getDeals(categoryIndex, 0, 100);
        }
    }
}

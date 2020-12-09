// Copyright 2014 The Oppia Authors. All Rights Reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS-IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * @fileoverview Directive for the local navigation in the collection view.
 */

import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { downgradeComponent } from '@angular/upgrade/static';
import { ReadOnlyCollectionBackendApiService } from
  'domain/collection/read-only-collection-backend-api.service';
import { UrlService } from 'services/contextual/url.service';
import { UrlInterpolationService } from
  'domain/utilities/url-interpolation.service';

@Component({
  selector: 'collection-local-nav',
  templateUrl: './collection-local-nav.component.html',
  styleUrls: []
})
export class CollectionLocalNavComponent implements OnInit, OnDestroy {
  constructor(
      private readOnlyCollectionBackendApiService:
       ReadOnlyCollectionBackendApiService,
      private urlService: UrlService,
      private urlInterpolationService: UrlInterpolationService,
      private collectionId: string,
      private directiveSubscriptions = new Subscription(),
      private canEdit: boolean
  ) {}
  ngOnInit(): void {
    this.collectionId = this.urlService.getCollectionIdFromUrl();
    this.directiveSubscriptions.add(
      this.readOnlyCollectionBackendApiService.onCollectionLoad.subscribe(
        () => {
          var collectionDetails = (
            this.readOnlyCollectionBackendApiService.getCollectionDetails(
              this.collectionId));
          this.canEdit = collectionDetails.canEdit;
        }
      )
    );
  }
  ngOnDestroy(): void {
    this.directiveSubscriptions.unsubscribe();
  }
}
angular.module('oppia').directive(
  'collectionLocalNav',
  downgradeComponent({component: CollectionLocalNavComponent}));
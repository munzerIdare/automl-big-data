import React, { lazy, Suspense } from "react";

const AddData = lazy(() => import("./AddData"));

const DataTab = (props) => {
  return (
    <div>
      <div className="laft-scroll-section">
        <Suspense fallback={<div>Loading...</div>}>
          <AddData />
        </Suspense>
      </div>

      <div className="tab-btn_group d-flex justify-content-end p-2 flex-three-content_center mt-3"></div>
    </div>
  );
};

export default DataTab;

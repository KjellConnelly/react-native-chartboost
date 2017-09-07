using ReactNative.Bridge;
using System;
using System.Collections.Generic;
using Windows.ApplicationModel.Core;
using Windows.UI.Core;

namespace Com.Reactlibrary.RNChartboost
{
    /// <summary>
    /// A module that allows JS to share data.
    /// </summary>
    class RNChartboostModule : NativeModuleBase
    {
        /// <summary>
        /// Instantiates the <see cref="RNChartboostModule"/>.
        /// </summary>
        internal RNChartboostModule()
        {

        }

        /// <summary>
        /// The name of the native module.
        /// </summary>
        public override string Name
        {
            get
            {
                return "RNChartboost";
            }
        }
    }
}

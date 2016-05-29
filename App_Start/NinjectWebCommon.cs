[assembly: WebActivatorEx.PreApplicationStartMethod(typeof(HorecaMebel.App_Start.NinjectWebCommon), "Start")]
[assembly: WebActivatorEx.ApplicationShutdownMethodAttribute(typeof(HorecaMebel.App_Start.NinjectWebCommon), "Stop")]

namespace HorecaMebel.App_Start
{
    using System;
    using System.Web;

    using Microsoft.Web.Infrastructure.DynamicModuleHelper;

    using Ninject;
    using Ninject.Web.Common;
    using HorecaBL.DB.Administration;
    using HorecaMebel.Models.Administration;
    using System.Configuration;
    using HorecaBL.Administration;

    public static class NinjectWebCommon 
    {
        private static readonly Bootstrapper bootstrapper = new Bootstrapper();

        /// <summary>
        /// Starts the application
        /// </summary>
        public static void Start() 
        {
            DynamicModuleUtility.RegisterModule(typeof(OnePerRequestHttpModule));
            DynamicModuleUtility.RegisterModule(typeof(NinjectHttpModule));
            bootstrapper.Initialize(CreateKernel);
        }
        
        /// <summary>
        /// Stops the application.
        /// </summary>
        public static void Stop()
        {
            bootstrapper.ShutDown();
        }
        
        /// <summary>
        /// Creates the kernel that will manage your application.
        /// </summary>
        /// <returns>The created kernel.</returns>
        private static IKernel CreateKernel()
        {
            var kernel = new StandardKernel();
            try
            {
                kernel.Bind<Func<IKernel>>().ToMethod(ctx => () => new Bootstrapper().Kernel);
                kernel.Bind<IHttpModule>().To<HttpApplicationInitializationHttpModule>();

                RegisterServices(kernel);
                return kernel;
            }
            catch
            {
                kernel.Dispose();
                throw;
            }
        }

        /// <summary>
        /// Load your modules or register your services here!
        /// </summary>
        /// <param name="kernel">The kernel.</param>
        private static void RegisterServices(IKernel kernel)
        {
            kernel.Bind<IUserDbContext>().To<EFWrapper>();
            kernel.Bind<IPromotionsDbContext>().To<EFWrapper>();
            kernel.Bind<IChairDbContext>().To<EFWrapper>();
            kernel.Bind<IArmchairDbContext>().To<EFWrapper>();
            kernel.Bind<ISofaDbContext>().To<EFWrapper>();
            kernel.Bind<ICubeSeatDbContext>().To<EFWrapper>();

            kernel.Bind<IReferencesDbContext>().To<EFWrapper>();
            
            kernel.Bind<IOrderInterface>().To<EFWrapper>();  

            kernel.Bind<IConfiguration>().To<Configurations>();
            kernel.Bind<IUtilities>().To<Utilities>();            
        }        
    }
}

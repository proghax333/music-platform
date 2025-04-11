import Bottle from "bottlejs";

const Bottle_service = Bottle.prototype.service;

Bottle.prototype.service = function (name, service, ...deps) {
  const options = {
    deps: service.deps || [],
    lazyDeps: service.lazyDeps || [],
  };

  Bottle_service.call(this, name, service, ...deps);

  let initialized = false;
  this.middleware(name, (service, next) => {
    if (initialized) {
      return next();
    }
    initialized = true;

    options.deps.forEach((dep) => {
      const value = this.container[dep];
      if (value) {
        service[dep] = value;
      } else {
        throw new Error(`Dependency "${dep}" not found in container.`);
      }
    });

    options.lazyDeps.forEach((dep) => {
      const value = this.container[dep];
      if (value) {
        service[dep] = value;
      } else {
        throw new Error(`Lazy dependency "${dep}" not found in container.`);
      }
    });

    return next();
  });
};

export function createDIContainer(name) {
  const di = new Bottle(name);
  return di;
}

// class Container {
//   constructor() {
//     this.services = new Map();
//     this.singletons = new Map();
//   }

//   /**
//    * Registers a service in the container.
//    * @param {string} name - The unique name of the service.
//    * @param {{ provide: function, inject?: string[], singleton?: boolean }} service - The service object.
//    */
//   register(name, service) {
//     if (this.services.has(name)) {
//       throw new Error(`Service "${name}" is already registered.`);
//     }
//     this.services.set(name, {
//       name,
//       provide: service.provide,
//       inject: service.inject || [],
//       singleton: service.singleton || false,
//     });
//   }

//   /**
//    * Unregisters a service from the container.
//    * @param {string} name - The name of the service to remove.
//    */
//   unregister(name) {
//     if (!this.services.has(name)) {
//       throw new Error(`Service "${name}" is not registered.`);
//     }
//     this.services.delete(name);
//     this.singletons.delete(name);
//   }

//   /**
//    * Resolves and returns the service along with its dependencies.
//    * @param {string} name - The name of the service to retrieve.
//    * @returns {Promise<any>} - The provided service value.
//    */
//   async resolve(name) {
//     if (!this.services.has(name)) {
//       throw new Error(`Service "${name}" is not registered.`);
//     }

//     const service = this.services.get(name);

//     // If it's a singleton and already instantiated, return it
//     if (service.singleton && this.singletons.has(name)) {
//       return this.singletons.get(name);
//     }

//     // Resolve dependencies
//     const dependencies = await Promise.all(
//       service.inject.map((dep) => this.resolve(dep))
//     );

//     // Create the service instance
//     const instance = await service.provide(...dependencies);

//     // Store in singleton cache if necessary
//     if (service.singleton) {
//       this.singletons.set(name, instance);
//     }

//     return instance;
//   }

//   /**
//    * Gets a description of a registered service.
//    * @param {string} name - The name of the service.
//    * @returns {Object} - The service description.
//    */
//   describe(name) {
//     if (!this.services.has(name)) {
//       throw new Error(`Service "${name}" is not registered.`);
//     }
//     const service = this.services.get(name);
//     return {
//       name: service.name,
//       provide: service.provide,
//       inject: service.inject,
//       singleton: service.singleton,
//     };
//   }
// }

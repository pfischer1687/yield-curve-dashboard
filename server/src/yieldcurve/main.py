from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from yieldcurve.api.v1.routes.auth import router as auth_router
from yieldcurve.api.v1.routes.yieldcurve import router as yieldcurve_router


def _configure_cors(app: "FastAPI") -> None:
    """Adds CORS middleware to the app.

    Args:
        app (FastAPI): App instance.
    """
    app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],  # TODO: Allow all origins in dev.
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )


def _register_routes(app: "FastAPI") -> None:
    """Registers API routers with the app.

    Args:
        app (FastAPI): App instance.
    """
    app.include_router(auth_router, prefix="/api/v1/auth", tags=["auth"])
    app.include_router(yieldcurve_router, prefix="/api/v1/yieldcurve", tags=["yieldcurve"])


def create_app() -> "FastAPI":
    """Returns a configured app instance.

    Returns:
        FastAPI: Configured app instance.
    """
    app = FastAPI()
    _configure_cors(app)
    _register_routes(app)
    return app


app = create_app()

"""Defines the user authentication-related API endpoints for version 1 of the application.

NOTE: This dev-only implementation uses header-based "Bearer <user_id>" auth and minimal identity checks.
It is intentionally designed to be replaced with production-ready authentication (e.g., Auth0, OAuth2, JWT).
"""

from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from yieldcurve.api.v1.schemas.auth import UserCreate, UserRead
from yieldcurve.api.v1.services.auth import AuthService
from yieldcurve.core.auth import get_current_user
from yieldcurve.db.models.user import User
from yieldcurve.db.session import get_db

router = APIRouter()


def get_auth_service() -> AuthService:
    """Returns an instance of the auth service.

    Returns:
        AuthService: An instance of the auth service.
    """
    return AuthService()


@router.post("/signup")
async def signup(
    user_in: UserCreate, db: AsyncSession = Depends(get_db), service: AuthService = Depends(get_auth_service)
) -> UserRead:
    """Creates a new user in the DB.

    Args:
        user_in (UserCreate): Desired user credentials.
        db (AsyncSession, optional): DB session for I/O operations. Defaults to Depends(get_db).
        service (AuthService, optional): Authorization service. Defaults to Depends(get_auth_service).

    Returns:
        UserRead: Newly created user data.
    """
    return await service.signup(user_in, db)


@router.post("/login")
async def login(
    user_in: UserCreate, db: AsyncSession = Depends(get_db), service: AuthService = Depends(get_auth_service)
) -> UserRead:
    """Logs in a user based on their credentials.

    Args:
        user_in (UserCreate): User credentials.
        db (AsyncSession, optional): DB session for I/O operations. Defaults to Depends(get_db).
        service (AuthService, optional): Authorization service. Defaults to Depends(get_auth_service).

    Returns:
        UserRead: Authenticated user data.
    """
    return await service.login(user_in, db)


@router.get("/me")
def get_current_user_profile(
    user: User = Depends(get_current_user), service: AuthService = Depends(get_auth_service)
) -> UserRead:
    """Returns the authenticated user's profile.

    Args:
        user (User, optional): Authenticated user instance. Defaults to Depends(get_current_user).
        service (AuthService, optional): _description_. Defaults to Depends(get_auth_service).

    Returns:
        UserRead: Authenticated user data.
    """
    return service.get_current_user_profile(user)
